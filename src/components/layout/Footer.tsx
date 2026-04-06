"use client";

import { socialLinks as defaultSocialLinks } from "@/lib/social";
import { Mail, MessageSquare } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Footer = ({ settings, socialDynamic }: { settings?: any, socialDynamic?: any[] }) => {
  const pathname = usePathname();
  
  const contactEmail = settings?.contactEmail || "anfalblank@gmail.com";
  const contactPhoneRaw = settings?.contactPhone || "+6285157938871";
  const waLink = `https://wa.me/${contactPhoneRaw.replace(/\D/g, "")}`;
  const contactPhoneDisplay = contactPhoneRaw.startsWith("62") || contactPhoneRaw.startsWith("+62") 
    ? `+${contactPhoneRaw.replace(/^\+/, "")}` 
    : contactPhoneRaw;
  const linksToUse = socialDynamic && socialDynamic.length > 0 ? socialDynamic : defaultSocialLinks;

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/links") || pathname?.startsWith("/launch")) return null;

  return (
    <footer className="border-t border-white/[0.06] mt-10">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="text-white font-semibold text-lg mb-3 tracking-tight">
              Anfal <span className="text-gray-500">Hidayat</span>
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Engineer bridging physical systems and digital platforms. 
              Building robust and beautiful solutions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-4">Navigation</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Skills", href: "/skills" },
                { label: "Contact", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact shortcuts */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                {contactEmail}
              </a>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Social icons row + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06]">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {linksToUse.map((link) => {
              const defaultMatch = defaultSocialLinks.find(
                (d) => d.name.toLowerCase() === (link.platform || link.name || "").toLowerCase()
              );
              
              let IconComponent = null;
              if (!defaultMatch && link.iconName && (LucideIcons as any)[link.iconName]) {
                IconComponent = (LucideIcons as any)[link.iconName];
              }
              return (
                <a
                  key={link.name || link.platform}
                  href={link.href || link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name || link.platform}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-white glass rounded-xl border border-white/5 hover:border-white/15 transition-all hover:scale-110"
                >
                  {defaultMatch ? defaultMatch.icon : (IconComponent ? <IconComponent className="w-4 h-4" /> : <LucideIcons.Link className="w-4 h-4" />)}
                </a>
              );
            })}
          </div>

          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Anfal Hidayat · Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
};
