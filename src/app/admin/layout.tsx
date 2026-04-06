"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Target, Briefcase, FileText, Share2, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Settings", href: "/admin/settings", icon: Target },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Experience", href: "/admin/experience", icon: FileText },
  { name: "Social Links", href: "/admin/social", icon: Share2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Hide sidebar on the login page entirely
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex overflow-hidden">
      {/* Sidebar background styling strictly for admin mode */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-10" />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? "260px" : "80px" }}
        className="h-screen bg-zinc-950 border-r border-white/10 shrink-0 flex flex-col transition-all duration-300 relative z-20"
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          {sidebarOpen && (
            <span className="font-bold text-white text-lg tracking-tight">Anfal Admin</span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-inner border border-white/5"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                  }`}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <item.icon size={20} className={isActive ? "text-white" : "text-gray-500"} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-4 px-3 py-3 rounded-xl w-full text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar p-8 md:p-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
