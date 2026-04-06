import { db } from "@/server/db";
import { portfolio, experience } from "@/server/db/schema";
import { count } from "drizzle-orm";
import { ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Safe edge-compatible counts, returning 0 if the tables don't exist yet before migrations
  let totalProjects = 0;
  let totalExperiences = 0;

  try {
    const portfolioRes = await db.select({ count: count() }).from(portfolio);
    const expRes = await db.select({ count: count() }).from(experience);
    totalProjects = portfolioRes[0].count;
    totalExperiences = expRes[0].count;
  } catch (error) {
    console.log("Database might not be initialized yet");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back. Manage your portfolio platform here.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass rounded-lg text-sm flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10">
            <RefreshCw size={16} /> Sync Config
          </button>
          <Link href="/" target="_blank" className="px-4 py-2 bg-white text-black rounded-lg text-sm flex items-center gap-2 font-medium hover:bg-gray-200 transition-colors">
            <ExternalLink size={16} /> View Live Site
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Total Projects</h3>
          <p className="text-4xl font-bold text-white">{totalProjects}</p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Career Timeline Nodes</h3>
          <p className="text-4xl font-bold text-white">{totalExperiences}</p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-white/10 border-l-4 border-l-green-500">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
          <p className="text-xl font-bold text-green-400 mt-2">All Systems Operational</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 p-1 flex items-center justify-center min-h-[300px]">
        <p className="text-sm text-gray-500 font-medium">Activity Chart / Analytics will go here</p>
      </div>
    </div>
  );
}
