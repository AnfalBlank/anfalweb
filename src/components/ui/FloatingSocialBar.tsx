"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/social";

export const FloatingSocialBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
    >
      <div className="flex flex-col gap-1 p-2 rounded-2xl glass border border-white/10">
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.25, x: -4 }}
            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-xl"
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
      {/* vertical line below */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent origin-top"
      />
    </motion.div>
  );
};
