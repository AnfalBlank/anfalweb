"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Users, Flag, Trophy, Crown } from "lucide-react";

const education = [
  {
    institution: "Telkom University Bandung",
    period: "2014 - 2017",
    degree: "Applied Science Studies",
    icon: GraduationCap,
  },
  {
    institution: "SMA Negeri 3 Makassar",
    period: "2012 - 2014",
    degree: "Senior High School",
    icon: BookOpen,
  },
];

const leadership = [
  {
    role: "Chairman of Student Election Commission (KPU) FIT",
    year: "2015",
    icon: Crown,
  },
  {
    role: "Head of Arts & Culture Division",
    organization: "KBMS",
    icon: Flag,
  },
  {
    role: "Head of Communication & External Relations",
    organization: "PSM Makassar Supporters (Bandung Branch)",
    icon: Users,
  },
  {
    role: "South Sulawesi Cultural Ambassador",
    organization: "Telkom University",
    icon: Award,
  },
  {
    role: "Top 8 Finalist",
    organization: "Hackathon 2015",
    icon: Trophy,
  },
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-16 lg:py-24 w-full relative">
      <div className="absolute inset-0 bg-neutral-950/20 z-0" />
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">
            Background
          </span>
          <h2 className="section-title">Education & Leadership</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Education Column */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              Formal Education
            </h3>
            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">{edu.institution}</h4>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <edu.icon className="w-4 h-4 opacity-70" />
                    {edu.degree}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership & Awards Column */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-400" />
              Leadership & Achievements
            </h3>
            <div className="flex flex-col gap-4">
              {leadership.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 border border-white/5 hover:border-white/20 transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all">
                    <item.icon className="w-5 h-5 text-gray-300 group-hover:text-purple-300 transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <h4 className="text-[15px] font-medium text-white/90 group-hover:text-white transition-colors">{item.role}</h4>
                    {(item.organization || item.year) && (
                      <p className="text-sm text-gray-400 mt-1">
                        {item.organization} {item.year && <span className="text-gray-500 text-xs ml-2 font-mono">({item.year})</span>}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
