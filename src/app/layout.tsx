import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettingsAction } from "@/server/actions/settings";
import { getSocialLinksAction } from "@/server/actions/social";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anfal Hidayat | Engineer & Developer",
  description:
    "Personal portfolio of Anfal Hidayat — Mechanical & Electrical Engineer specializing in Fuel Systems, Automation, and scalable web platforms.",
  keywords: ["Anfal Hidayat", "portfolio", "engineer", "developer", "IoT", "Next.js"],
  authors: [{ name: "Anfal Hidayat" }],
  openGraph: {
    title: "Anfal Hidayat | Engineer & Developer",
    description:
      "Portfolio of Anfal Hidayat — bridging physical engineering with digital platforms.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettingsAction();
  const socialDynamic = await getSocialLinksAction();
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="min-h-screen text-gray-100 overflow-x-hidden selection:bg-white/15 selection:text-white relative">
        <SmoothScroll>

          <ScrollProgress />
          <CursorSpotlight />
          <Navbar />

          <main className="relative z-10">{children}</main>

          <Footer settings={settings} socialDynamic={socialDynamic} />
        </SmoothScroll>
      </body>
    </html>
  );
}
