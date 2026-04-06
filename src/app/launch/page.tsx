import { getSocialLinksAction } from "@/server/actions/social";
import { getSiteSettingsAction } from "@/server/actions/settings";
import { socialLinks as defaultSocialLinks } from "@/lib/social";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Anfal Hidayat | Welcome",
  description: "Selamat datang di halaman personal saya. Terhubung dengan saya atau kunjungi portofolio penuh saya.",
};

export default async function LaunchPage() {
  const socialDynamic = await getSocialLinksAction();
  
  const normalizedLinks = socialDynamic && socialDynamic.length > 0
    ? socialDynamic.map((l: any) => ({
        id: l.id,
        name: l.platform,
        href: l.url,
        iconName: l.iconName || "Link"
      }))
    : defaultSocialLinks.map((l: any) => ({
        id: l.name,
        name: l.name,
        href: l.href,
        iconName: "Link"
      }));

  const name = "Anfal Hidayat";
  const greeting = "Halo! Senang bertemu dengan Anda. 👋";
  const bio = "Saya adalah seorang Engineer yang antusias dalam membangun solusi digital modern yang elegan dan responsif. Silakan jelajahi portofolio utama saya atau mari terhubung melalui platform di bawah ini!";

  return (
    <div className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative overscroll-none overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-neutral-950 -z-20" />
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-lg mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Profile Image */}
        <div className="relative w-32 h-32 mb-8 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-white shadow-xl shadow-blue-900/20">
          <div className="w-full h-full bg-zinc-950 rounded-full overflow-hidden border-[3px] border-zinc-950 relative">
            <Image 
              src="/foto-saya-1.png" 
              alt={name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 128px, 128px"
              priority
            />
          </div>
        </div>

        {/* Intro */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-white/80 text-sm font-medium">{greeting}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Saya <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{name}</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
          {bio}
        </p>

        {/* Main Website Link (Highlight) */}
        <div className="w-full mb-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-40 group-hover:opacity-70 group-hover:blur-md transition duration-500 blur-sm" />
          <Link href="/" className="relative w-full flex items-center justify-between glass-card rounded-2xl p-5 bg-zinc-900/80 border border-white/20 hover:bg-zinc-800/90 hover:border-white/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center shadow-lg">
                <LucideIcons.Globe size={24} className="stroke-[2]" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-base md:text-lg">Kunjungi Web Utama</p>
                <p className="text-xs md:text-sm text-gray-300">Portofolio & Pengalaman Lengkap</p>
              </div>
            </div>
            <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Social Links */}
        <div className="w-full flex flex-col gap-4">
          <p className="text-sm font-medium text-white/50 mb-2 uppercase tracking-widest">Mari Terhubung</p>
          {normalizedLinks.map((link) => {
            const officialMatch = defaultSocialLinks.find(
              (l: any) => l.name.toLowerCase() === link.name.toLowerCase()
            ) as any;
            let IconComponent = null;
            if (!officialMatch && link.iconName && (LucideIcons as any)[link.iconName]) {
              IconComponent = (LucideIcons as any)[link.iconName];
            }

            return (
              <a
                key={link.id || link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-4 glass-card rounded-xl p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all text-white group-hover:text-blue-400 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:transition-colors">
                  {officialMatch ? officialMatch.icon : (IconComponent ? <IconComponent strokeWidth={2} /> : <LucideIcons.Link strokeWidth={2} />)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">{link.name}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">{link.href.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              </a>
            );
          })}

        </div>
      </div>

      <div className="mt-20 text-center z-10 opacity-60">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {name}. Semua hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
