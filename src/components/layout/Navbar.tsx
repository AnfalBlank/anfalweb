"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/links") || pathname?.startsWith("/launch") || pathname === "/") return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/60 border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/home"
            className="text-white font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-white">Anfal</span>
            <span className="text-gray-400"> Hidayat</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/hire-me"
              className="text-sm font-medium px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Hire Me
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-gray-300 hover:text-white p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/10 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-gray-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hire-me"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center font-medium px-5 py-2.5 rounded-full bg-white text-black"
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
