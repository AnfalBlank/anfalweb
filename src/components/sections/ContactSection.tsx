"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ContactSection = ({ settings }: { settings?: any }) => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const contactEmail = settings?.contactEmail || "anfalblank@gmail.com";
  const contactPhoneRaw = settings?.contactPhone || "+6285157938871";
  const contactLocation = settings?.contactLocation || "Jakarta, Indonesia";

  // Format phone for WhatsApp link
  // Ensure it doesn't have spaces or + internally for wa.me link
  const waLink = `https://wa.me/${contactPhoneRaw.replace(/\D/g, "")}`;
  
  // Format for display (basic)
  const contactPhoneDisplay = contactPhoneRaw.startsWith("62") || contactPhoneRaw.startsWith("+62") 
    ? `+${contactPhoneRaw.replace(/^\+/, "")}` 
    : contactPhoneRaw;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3 block">
              Get In Touch
            </span>
            <h2 className="section-title mb-4">Let&apos;s Work Together</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Whether you have a project in mind, need technical consultation, or just want to connect —
              my inbox is always open.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left: Contact info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <motion.a
                href={`mailto:${contactEmail}`}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-5 glass-card rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email me at</p>
                  <p className="text-white font-medium group-hover:text-gray-200 transition-colors">
                    {contactEmail}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-5 glass-card rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
                  <p className="text-white font-medium group-hover:text-gray-200 transition-colors">
                    {contactPhoneDisplay}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactLocation)}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-5 glass-card rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Based in</p>
                  <p className="text-white font-medium group-hover:text-gray-200 transition-colors">{contactLocation}</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeUp}>
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors bg-transparent resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-gray-200"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
