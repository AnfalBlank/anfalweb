"use client";

import { motion, Variants } from "framer-motion";

const skillGroups = [
  {
    category: "Engineering",
    skills: [
      { name: "Fuel Systems", level: 95 },
      { name: "Industrial Automation", level: 88 },
      { name: "Electrical Systems", level: 85 },
      { name: "Mechanical Design", level: 80 },
    ],
  },
  {
    category: "Software",
    skills: [
      { name: "Next.js / React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "Python", level: 78 },
    ],
  },
  {
    category: "Design & Tools",
    skills: [
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
      { name: "UI/UX Design", level: 80 },
      { name: "System Architecture", level: 87 },
    ],
  },
];

const tagSkills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Node.js", "Python", "SQLite",
  "IoT / MQTT", "ESP32", "Embedded Systems", "Fuel Systems",
  "Automation", "System Design", "UI/UX", "PostgreSQL",
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 lg:py-24 w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">
            What I Work With
          </span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </motion.div>

        {/* Skill Bars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: gi * 0.12 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-6">
                {group.category}
              </h3>
              <div className="flex flex-col gap-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-gray-200">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-white/60 to-white/30 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag Cloud */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap gap-4 justify-center mt-12"
        >
          {tagSkills.map((tag) => (
            <motion.div
              key={tag}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-5 py-2 glass rounded-full border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/25 cursor-default transition-colors"
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
