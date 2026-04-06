"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "30+", label: "Projects Delivered" },
  { value: "3", label: "Engineering Domains" },
];

export const AboutSection = ({ settings }: { settings?: any }) => {
  const aboutTitle = settings?.aboutTitle || "Engineer at the \\nintersection\\n of worlds";
  const aboutTitleParts = aboutTitle.split("\\n");
  const aboutText1 = settings?.aboutText1 || "I am a passionate engineer who bridges physical systems with cutting-edge digital platforms. Specializing in Fuel Systems, Industrial Automation, and scalable web architecture, I build solutions that work both in the field and in the cloud.";
  const aboutText2 = settings?.aboutText2 || "My approach combines deep mechanical and electrical engineering expertise with modern software development \u2014 creating robust, elegant solutions that are as functional as they are beautiful.";
  return (
    <section id="about" className="py-16 lg:py-24 w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          variants={{ hidden: {}, show: {} }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center lg:text-left"
        >
          {/* Left: photo */}
          <motion.div variants={fadeUp} className="relative flex justify-center md:justify-start">
            {/* Decorative backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] blur-2xl" />

            <motion.div
              whileHover={{ scale: 1.02, rotate: -2 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="relative w-full max-w-[280px] aspect-[4/5] lg:max-w-[320px] rounded-3xl glass-card overflow-hidden mx-auto lg:mx-0"
            >
              <Image 
                src="/foto-saya-2.PNG"
                alt="Anfal Hidayat"
                fill
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />
              {/* Grid pattern decoration */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-3">
                <p className="text-xs text-gray-300 font-medium">Anfal Hidayat</p>
                <p className="text-xs text-gray-500">Engineer · Developer · Builder</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: content */}
          <div className="flex flex-col gap-8 items-center lg:items-start">
            <motion.div variants={fadeUp} className="w-full">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">About Me</span>
              <h2 className="section-title mb-6">
                {aboutTitleParts[0] || "Engineer at the"} <br />
                <span className="text-gray-400 font-light italic">{aboutTitleParts[1] || "intersection"}</span> {aboutTitleParts[2] || "of worlds"}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-wrap">
                {aboutText1}
              </p>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {aboutText2}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 text-center border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
