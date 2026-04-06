"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, FileText } from "lucide-react";
import { socialLinks as defaultSocialLinks } from "@/lib/social";
import { Hero3DObject } from "@/components/ui/Hero3DObject";
import { ProfileSlider } from "@/components/ui/ProfileSlider";
import { useState } from "react";
import * as LucideIcons from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const HeroSection = ({ settings, socialDynamic }: { settings?: any, socialDynamic?: any[] }) => {
  const [showCVPreview, setShowCVPreview] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [cvPassword, setCvPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cvPassword === "ANFALCV") {
      setShowPasswordModal(false);
      setPasswordError(false);
      setCvPassword("");
      // Trigger download
      window.open("/resume.pdf", "_blank");
    } else {
      setPasswordError(true);
    }
  };

  const heroTitleLines = settings?.heroTitle ? settings.heroTitle.split("\\n") : ["Building Engineering", "Systems"];
  const heroSubtitle = settings?.heroSubtitle || "From Physical";
  const heroSubtitleAfter = settings?.heroTitle && !settings?.heroTitle.includes("\\n") ? "" : "to Digital";
  const heroDescription = settings?.heroDescription || "Mechanical & Electrical Engineer specializing in Fuel Systems, Automation, and scalable high-end web platforms.";
  const availableForWork = settings?.availableForWork ?? true;

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center min-h-[100svh] pt-32 lg:pt-24 pb-20 overflow-hidden w-full"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Hero3DObject />
      </div>
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center lg:text-left">
          {/* Left: Text Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-start"
          >
            {/* Badge */}
            {availableForWork && (
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-sm text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available for new projects
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight text-white mb-6"
            >
              {heroTitleLines[0] || "Building Engineering"}
              <br />
              {heroTitleLines[1] || "Systems"}{" "}
              <span className="text-gray-400 font-light italic">
                {heroSubtitle}
              </span>
              <br />
              {heroSubtitleAfter && heroSubtitleAfter}
            </motion.h1>

            {/* Sub-description */}
            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8 whitespace-pre-wrap"
            >
              {heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 w-full">
              <div className="relative group perspective-1000">
                <motion.button
                  onClick={() => setShowPasswordModal(true)}
                  onMouseEnter={() => setShowCVPreview(true)}
                  onMouseLeave={() => setShowCVPreview(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </motion.button>

                {/* Animated CV Preview Popover */}
                <AnimatePresence>
                  {showCVPreview && !showPasswordModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, rotateX: -15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, rotateX: -15, scale: 0.9 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                      className="absolute -top-36 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl glass-card backdrop-blur-xl border border-white/20 shadow-2xl origin-bottom"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-full h-28 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                        <FileText className="w-8 h-8 text-white/50" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                View Work
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Social Icons — Hero Quick Access */}
            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start gap-3 w-full">
              {(socialDynamic && socialDynamic.length > 0 ? socialDynamic : defaultSocialLinks).map((link: any) => {
                const defaultMatch = defaultSocialLinks.find(
                  (d) => d.name.toLowerCase() === (link.platform || link.name || "").toLowerCase()
                );
                
                let IconComponent = null;
                if (!defaultMatch && link.iconName && (LucideIcons as any)[link.iconName]) {
                  IconComponent = (LucideIcons as any)[link.iconName];
                }
                
                return (
                  <motion.a
                    key={link.name || link.platform}
                    href={link.href || link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name || link.platform}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-white glass rounded-xl border border-white/10 hover:border-white/25 transition-colors"
                  >
                    {defaultMatch ? defaultMatch.icon : (IconComponent ? <IconComponent className="w-4 h-4" /> : <LucideIcons.Link className="w-4 h-4" />)}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ rotate: 3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-full max-w-[280px] aspect-[4/5] lg:max-w-[320px] rounded-3xl overflow-hidden glass-card group"
            >
              <ProfileSlider
                images={[
                  "/foto-saya-1.png",
                  "/foto-saya-2.PNG"
                ]}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
          />
        </motion.div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError(false);
                  setCvPassword("");
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                <LucideIcons.Lock className="w-6 h-6 text-gray-300" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Protected Resume</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Please enter the password to download my detailed CV. 
                If you don't have it, feel free to contact me via email or WhatsApp to request access.
              </p>

              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="password"
                    value={cvPassword}
                    onChange={(e) => {
                      setCvPassword(e.target.value);
                      if (passwordError) setPasswordError(false);
                    }}
                    placeholder="Enter password..."
                    className={`w-full bg-black/40 border ${passwordError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'} rounded-xl px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600`}
                    autoFocus
                  />
                  {passwordError && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-2 ml-1">
                      Incorrect password. Please try again or contact me.
                    </motion.p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Unlock & Download
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
