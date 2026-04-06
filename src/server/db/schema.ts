import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// --- Better Auth Core Tables ---
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// --- CMS Tables ---
export const profile = sqliteTable("profile", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"),
  bio: text("bio"),
  photo: text("photo"),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey(),
  heroTitle: text("heroTitle"),
  heroSubtitle: text("heroSubtitle"),
  heroDescription: text("heroDescription"),
  aboutTitle: text("aboutTitle"),
  aboutText1: text("aboutText1"),
  aboutText2: text("aboutText2"),
  availableForWork: integer("availableForWork", { mode: "boolean" }),
  contactEmail: text("contactEmail"),
  contactPhone: text("contactPhone"),
  contactLocation: text("contactLocation"),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const portfolio = sqliteTable("portfolio", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  images: text("images", { mode: "json" }).$type<string[]>(),
  tech: text("tech", { mode: "json" }).$type<string[]>(),
  year: text("year"),
  category: text("category"),
  gradient: text("gradient"),
  createdAt: integer("createdAt", { mode: "timestamp" }),
});

export const experience = sqliteTable("experience", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration"),
  location: text("location"),
  description: text("description"),
  isCurrent: integer("isCurrent", { mode: "boolean" }),
  orderIndex: integer("orderIndex"),
});

export const socialLinks = sqliteTable("social_links", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  iconName: text("iconName"),
  orderIndex: integer("orderIndex"),
});
