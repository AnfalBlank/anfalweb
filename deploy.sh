#!/bin/bash
# ============================================================
# Deploy Script — anfalweb (anfalhidayat.web.id)
# ============================================================
# Usage:
#   Pertama kali:  chmod +x deploy.sh && ./deploy.sh setup
#   Deploy ulang:  ./deploy.sh
# ============================================================

set -e

APP_NAME="anfalweb"
APP_DIR="/var/www/anfalweb"
REPO_URL="https://github.com/AnfalBlank/anfalweb.git"
BRANCH="main"
PORT=3000

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ============================================================
# SETUP — jalankan sekali saat pertama kali deploy di VPS
# ============================================================
setup() {
  log "Starting initial setup..."

  # Install Node.js 20 via NodeSource (jika belum ada)
  if ! command -v node &> /dev/null; then
    warn "Node.js not found. Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  log "Node.js $(node -v)"

  # Install PM2
  if ! command -v pm2 &> /dev/null; then
    warn "PM2 not found. Installing..."
    sudo npm install -g pm2
  fi
  log "PM2 $(pm2 -v)"

  # Clone repo
  if [ ! -d "$APP_DIR" ]; then
    log "Cloning repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    git clone "$REPO_URL" "$APP_DIR"
  fi

  cd "$APP_DIR"
  git checkout "$BRANCH"

  # Install dependencies
  log "Installing dependencies..."
  npm install

  # Buat .env jika belum ada
  if [ ! -f ".env" ]; then
    warn "Creating .env file — edit sesuai kebutuhan!"
    cat > .env << 'EOF'
# Database (SQLite lokal)
DATABASE_URL=file:./sqlite.db

# Better Auth
BETTER_AUTH_SECRET=ganti-dengan-secret-random-anda
BETTER_AUTH_URL=https://anfalhidayat.web.id

# Port
PORT=3000
EOF
  fi

  # Build
  log "Building application..."
  npm run build

  # Start dengan PM2
  log "Starting with PM2..."
  pm2 start npm --name "$APP_NAME" -- start -- -p $PORT
  pm2 save
  pm2 startup | tail -1 | bash 2>/dev/null || true

  echo ""
  log "========================================="
  log " Setup selesai!"
  log " App berjalan di http://localhost:$PORT"
  log " Gunakan reverse proxy (Nginx/Caddy)"
  log " untuk domain anfalhidayat.web.id"
  log "========================================="
}

# ============================================================
# DEPLOY — jalankan setiap kali mau update
# ============================================================
deploy() {
  log "Deploying $APP_NAME..."

  cd "$APP_DIR" || err "Directory $APP_DIR not found. Run './deploy.sh setup' first."

  # Pull latest
  log "Pulling latest changes..."
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"

  # Install dependencies (jika ada yang baru)
  log "Installing dependencies..."
  npm install

  # Build
  log "Building application..."
  npm run build

  # Restart PM2
  log "Restarting application..."
  pm2 restart "$APP_NAME"

  echo ""
  log "========================================="
  log " Deploy selesai! ✨"
  log " $(date '+%Y-%m-%d %H:%M:%S')"
  log "========================================="
}

# ============================================================
# NGINX CONFIG HELPER
# ============================================================
nginx_config() {
  cat << 'EOF'
# /etc/nginx/sites-available/anfalweb
server {
    listen 80;
    server_name anfalhidayat.web.id www.anfalhidayat.web.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Setelah buat file ini, jalankan:
#   sudo ln -s /etc/nginx/sites-available/anfalweb /etc/nginx/sites-enabled/
#   sudo nginx -t
#   sudo systemctl reload nginx
#   sudo certbot --nginx -d anfalhidayat.web.id -d www.anfalhidayat.web.id
EOF
}

# ============================================================
# MAIN
# ============================================================
case "${1:-deploy}" in
  setup)
    setup
    ;;
  deploy)
    deploy
    ;;
  nginx)
    nginx_config
    ;;
  *)
    echo "Usage: ./deploy.sh [setup|deploy|nginx]"
    echo ""
    echo "  setup  — First time setup (install deps, clone, build, start PM2)"
    echo "  deploy — Pull latest & rebuild (default)"
    echo "  nginx  — Print Nginx reverse proxy config"
    exit 1
    ;;
esac
