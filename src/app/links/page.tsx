import { getSocialLinksAction } from "@/server/actions/social";
import { getSiteSettingsAction } from "@/server/actions/settings";
import { socialLinks as defaultSocialLinks } from "@/lib/social";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Anfal Hidayat | Link in Bio",
  description: "Connect with me across various platforms or visit my full professional portfolio.",
};

export default async function LinksPage() {
  const socialDynamic = await getSocialLinksAction();
  const settings = await getSiteSettingsAction();
  
  const linksToUse = socialDynamic && socialDynamic.length > 0 ? socialDynamic : defaultSocialLinks;
  const name = settings?.heroName || "Anfal Hidayat";
  const bio = "Welcome! I'm an Engineer bridging physical systems with modern web technologies. Follow my updates or dive deeper into my professional background.";

  return (
    <div className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative overscroll-none">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-sm mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Profile Image */}
        <div className="relative w-28 h-28 mb-6 rounded-full p-1 bg-gradient-to-tr from-gray-500 to-white">
          <div className="w-full h-full bg-zinc-950 rounded-full overflow-hidden border-2 border-zinc-950 relative">
            <Image 
              src="/foto-saya-1.png" 
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 112px, 112px"
              priority
            />
          </div>
        </div>

        {/* Intro */}
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
          {name}
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 px-4">
          {bio}
        </p>

        {/* Main Website Link (Highlight) */}
        <div className="w-full mb-6 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-white rounded-2xl opacity-30 group-hover:opacity-50 transition duration-300 blur" />
          <Link href="/home" className="relative w-full flex items-center justify-between glass-card rounded-2xl p-4 bg-zinc-900 border border-white/20 hover:bg-zinc-800 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                <LucideIcons.Globe size={20} className="stroke-[2.5]" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Full Portfolio</p>
                <p className="text-xs text-gray-400">View projects & experience</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-300" />
          </Link>
        </div>

        {/* Social Links */}
        <div className="w-full flex flex-col gap-3">
          {linksToUse.map((link) => {
            const officialMatch = defaultSocialLinks.find(
              (l) => l.name.toLowerCase() === link.name.toLowerCase()
            );
            const svgPath = officialMatch?.svg;
            let IconComponent = LucideIcons[link.icon as keyof typeof LucideIcons] as any;
            if (!svgPath && !IconComponent) IconComponent = LucideIcons.Link;

            return (
              <a
                key={link.id || link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-4 glass-card rounded-2xl p-4 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  {svgPath ? (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:scale-110 transition-transform">
                      <path d={svgPath} />
                    </svg>
                  ) : (
                    <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform" strokeWidth={2} />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-sm font-medium">{link.name}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">{link.href.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-16 text-center z-10">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} {name}.
        </p>
      </div>
    </div>
  );
}
