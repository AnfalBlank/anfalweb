"use client";

import { motion } from "framer-motion";

const defaultExperiences = [
  {
    role: "Project and Operations",
    company: "PT. Manggala Utama Indonesia",
    duration: "2023 – Present",
    location: "Remote, Indonesia",
    description:
      "Managing project lifecycles and daily operational workflows. Ensuring efficient deployment, execution, and continuous support across nationwide projects.",
    current: true,
  },
  {
    role: "IoT & Automation Engineer",
    company: "Smart Industries Ltd.",
    duration: "2020 – 2023",
    location: "Jakarta, Indonesia",
    description:
      "Designed and deployed IoT monitoring systems for industrial fuel stations. Integrated embedded firmware with cloud analytics dashboards.",
    current: false,
  },
  {
    role: "IT Support Engineering",
    company: "PT. Usaha Jayamas Bhakti",
    duration: "2017 – Present",
    location: "Indonesia",
    description:
      "Installed and configured POS Pinsyst along with its supporting equipment, and provided technical support for SPKLU (Public Electric Vehicle Charging Station) operations.",
    current: true,
  },
];

export const ExperienceSection = ({ experiences }: { experiences?: any[] }) => {
  const experiencesToUse = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="experience" className="py-16 lg:py-24 w-full">
      <div className="max-w-[896px] w-full mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">
            Career
          </span>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {experiencesToUse.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    exp.isCurrent || exp.current 
                      ? "bg-white border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
                      : "bg-transparent border-white/30"
                  }`} />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[45%] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.01, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-white text-base leading-tight">{exp.role}</h3>
                      {(exp.isCurrent || exp.current) && (
                        <span className="shrink-0 ml-3 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-0.5">{exp.company}</p>
                    <p className="text-xs text-gray-600 mb-4 font-mono">{exp.duration} · {exp.location}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{exp.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
