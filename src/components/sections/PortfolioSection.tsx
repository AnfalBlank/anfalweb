"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, X, Code, ExternalLink, Box } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const defaultProjects = [
  {
    id: 1,
    title: "ManggalaOPS — ERP/CRM System",
    description:
      "Sistem ERP/CRM internal untuk PT. Manggala Utama Indonesia. Fitur lengkap: Client & Lead tracking, Quotation, Invoice, Surat Jalan, Kwitansi dengan format PDF konsisten, Finance double-entry, Accounting, Internal Chat, dan Audit Log.",
    tech: ["Next.js", "Drizzle ORM", "Turso", "TypeScript"],
    year: "2025",
    category: "Enterprise ERP",
    gradient: "from-zinc-900 via-zinc-800 to-zinc-900",
    githubUrl: "https://github.com/AnfalBlank/ManggalaOPS",
  },
  {
    id: 2,
    title: "SPBU Management System",
    description:
      "Sistem manajemen SPBU modern dengan AI-powered dashboard, POS multi-module (BBM, LPG, OLI, SnB), Auto Order System dengan prediksi stok, Smart Control untuk fraud detection, dan role-based access control.",
    tech: ["Next.js", "TypeScript", "Zustand", "Tailwind", "Framer Motion"],
    year: "2025",
    category: "Business System",
    gradient: "from-zinc-900 via-neutral-800 to-zinc-900",
    githubUrl: "https://github.com/AnfalBlank/spbu-management-system",
  },
  {
    id: 3,
    title: "Voucher SPBU — Distribusi Digital",
    description:
      "Sistem distribusi voucher BBM digital dengan role-based access, QR scanner, dashboard monitoring real-time, audit trail lengkap, dan laporan PDF/Excel otomatis.",
    tech: ["Next.js", "TypeScript", "Vercel"],
    year: "2025",
    category: "Business System",
    gradient: "from-zinc-900 via-stone-800 to-zinc-900",
    githubUrl: "https://github.com/AnfalBlank/voucher-spbunewrev",
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    description:
      "Website portfolio personal high-end dengan CMS admin panel, animasi Framer Motion, cursor spotlight, 3D hero object, smooth scroll, dan integrasi social media dinamis.",
    tech: ["Next.js", "Framer Motion", "Tailwind", "Drizzle", "Better Auth"],
    year: "2025",
    category: "Web Design",
    gradient: "from-zinc-900 via-neutral-900 to-zinc-900",
    githubUrl: "https://github.com/AnfalBlank/anfalweb",
  },
  {
    id: 5,
    title: "HRIS — Human Resource Information System",
    description:
      "Sistem informasi SDM lengkap dengan manajemen karyawan, absensi, cuti, payroll, performance review, dan organizational chart. Dashboard HR analytics untuk monitoring KPI karyawan.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "Tailwind"],
    year: "2025",
    category: "HR System",
    gradient: "from-zinc-900 via-emerald-950 to-zinc-900",
  },
  {
    id: 6,
    title: "Inventory Management System",
    description:
      "Sistem manajemen inventaris dengan fitur stock tracking real-time, barcode/QR scanner, auto-reorder point, laporan stok opname, dan multi-warehouse support.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "Tailwind"],
    year: "2025",
    category: "Business System",
    gradient: "from-zinc-900 via-amber-950 to-zinc-900",
  },
  {
    id: 7,
    title: "IoT Smart Fuel Station Monitor",
    description:
      "Sistem monitoring tangki BBM berbasis IoT dengan sensor real-time, dashboard tracking level bahan bakar, automated alerts saat stok kritis, dan analytics konsumsi harian.",
    tech: ["React", "Node.js", "MQTT", "ESP32"],
    year: "2023",
    category: "IoT / Embedded",
    gradient: "from-zinc-900 via-zinc-800 to-stone-900",
  },
  {
    id: 8,
    title: "Fuel Distribution Control System",
    description:
      "Sistem otomasi dispensing BBM berbasis PLC dengan electrical safety interlock, monitoring operasional real-time, dan comprehensive logging untuk audit keselamatan.",
    tech: ["PLC", "HMI", "SCADA", "Automation"],
    year: "2022",
    category: "Industrial",
    gradient: "from-zinc-900 via-zinc-800 to-zinc-900",
  },
];

type Project = any;

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const PortfolioSection = ({ portfolios }: { portfolios?: any[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectsToUse = portfolios && portfolios.length > 0 ? portfolios : defaultProjects;

  // Lock body scroll when modal is open
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-16 lg:py-24 w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">
              Selected Work
            </span>
            <h2 className="section-title">Projects</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed mx-auto md:mx-0">
            Engineering and digital projects spanning across physical systems, 
            industrial automation, and high-end web platforms.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsToUse.map((project: any) => (
            <motion.div
              layoutId={`project-${project.id}`}
              key={project.id}
              variants={cardVariant}
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -10, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Image area */}
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {project.images && project.images[0] ? (
                  <img src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="Dummy Tech Cover" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                )}
                {/* Hover zoom overlay */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40" />
                  <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white/5 backdrop-blur-sm rounded-2xl" />
                </motion.div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full glass border border-white/15 text-gray-300 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Arrow icon on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs font-mono">{project.year}</span>
                </div>
                <h3 className="text-white font-semibold text-lg leading-tight mb-3 group-hover:text-gray-100 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech?.map((t: string) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal via Portal */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-[2rem] bg-zinc-950/80 shadow-2xl flex flex-col z-10 custom-scrollbar"
                >
                  {/* Modal Header/Image */}
                  <div className={`relative h-64 md:h-80 bg-gradient-to-br ${selectedProject.gradient} flex-shrink-0`}>
                    {selectedProject.images && selectedProject.images[0] ? (
                      <img src={selectedProject.images[0]} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
                    ) : (
                      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Dummy Tech Cover" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-20"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Modal Content */}
                  <div className="p-8 md:p-12 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white font-medium uppercase tracking-wider">
                        {selectedProject.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedProject.year}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {selectedProject.title}
                    </h2>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-10">
                      {selectedProject.description}
                    </p>
                    
                    <div className="mb-10">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech?.map((t: string) => (
                          <span
                            key={t}
                            className="text-sm px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto flex gap-4 pt-6 border-t border-white/10">
                      <a 
                        href={`https://wa.me/6285157938871?text=${encodeURIComponent("Halo Mas Anfal! Saya tertarik untuk melihat Live Demo dari project *" + selectedProject.title + "*. Boleh saya minta akses link-nya?")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      {selectedProject.githubUrl ? (
                        <a 
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          GitHub
                        </a>
                      ) : (
                        <a 
                          href={`https://wa.me/6285157938871?text=${encodeURIComponent("Halo Mas Anfal! Saya tertarik dengan sistem dari project *" + selectedProject.title + "*. Apakah memungkinkan untuk berkonsultasi mengenai source code-nya?")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};
