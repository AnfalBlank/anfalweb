import { db } from "@/server/db";
import { portfolio } from "@/server/db/schema";
import { addPortfolioAction } from "@/server/actions/portfolio";
import { Plus, Image as ImageIcon } from "lucide-react";

export default async function AdminPortfolio() {
  let items: any[] = [];
  try {
     items = await db.select().from(portfolio);
  } catch(e) {}

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Manager</h1>
          <p className="text-gray-400">Add or remove your projects here.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Plus size={20}/> Add New Project</h2>
          <form action={addPortfolioAction} className="flex flex-col gap-5">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1.5 block">Title</label>
              <input name="title" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1.5 block">Description</label>
              <textarea name="description" required rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1.5 block">Tech Stack (comma separated)</label>
              <input name="tech" required placeholder="Next.js, Tailwind, SQLite" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1.5 block">Year</label>
                 <input name="year" required placeholder="2025" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1.5 block">Category</label>
                 <input name="category" required placeholder="SaaS" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
               </div>
            </div>
            
            <button type="submit" className="w-full py-4 mt-4 bg-white text-black font-bold tracking-wide rounded-xl hover:bg-gray-200 transition-colors">
              Publish Project
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Live Projects ({items.length})</h2>
          {items.length === 0 ? (
             <div className="glass-card p-10 rounded-[2rem] flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/20 min-h-[300px]">
               <ImageIcon size={40} className="mb-4 opacity-50" />
               <p>No projects uploaded yet.</p>
             </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                 <div key={item.id} className="glass border border-white/10 rounded-2xl p-5 flex gap-5 items-center">
                    <div className="w-24 h-24 bg-zinc-900 rounded-xl flex items-center justify-center text-xs text-gray-600 shrink-0">
                       Image
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/10 text-gray-300 inline-block mt-1 mb-2">{item.category} • {item.year}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
