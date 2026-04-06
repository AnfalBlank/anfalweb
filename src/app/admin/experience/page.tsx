import { getExperiencesAction, addExperienceAction, deleteExperienceAction } from "@/server/actions/experience";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default async function ExperiencePage() {
  const experiences = await getExperiencesAction();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Experience</h1>
          <p className="text-gray-400 mt-2">Manage your career history and timeline.</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
          <Plus className="w-5 h-5 text-gray-400" />
          Add New Experience
        </h2>
        <form action={addExperienceAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Company</label>
              <input 
                name="company" 
                type="text"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                placeholder="e.g. PT Pertamina"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Role</label>
              <input 
                name="role" 
                type="text"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                placeholder="e.g. Lead Engineer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Duration</label>
              <input 
                name="duration" 
                type="text"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                placeholder="e.g. Jan 2021 - Present"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Location</label>
              <input 
                name="location" 
                type="text"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                placeholder="e.g. Jakarta, Indonesia"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Description</label>
            <textarea 
              name="description" 
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
              placeholder="Describe your responsibilities..."
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              name="isCurrent" 
              id="isCurrent"
              className="w-5 h-5 bg-black border border-white/20 rounded focus:ring-zinc-500"
            />
            <label htmlFor="isCurrent" className="text-sm text-gray-300">This is my current role</label>
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto self-end mt-2 flex items-center justify-center gap-2 bg-white text-black font-semibold py-2.5 px-6 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Add Experience
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-2xl">
            No experiences added yet.
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="flex items-start justify-between glass-card p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 mt-1 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">{exp.role}</h3>
                  <p className="text-gray-400">{exp.company} • {exp.duration}</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{exp.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <form action={async () => {
                  "use server";
                  await deleteExperienceAction(exp.id);
                }}>
                  <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
