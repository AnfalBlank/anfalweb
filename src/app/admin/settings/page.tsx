import { getSiteSettingsAction, saveSiteSettingsAction } from "@/server/actions/settings";
import { Save } from "lucide-react";

export default async function SettingsPage() {
  const settings = await getSiteSettingsAction();

  return (
    <div className="max-w-4xl max-w-full space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Site Settings</h1>
          <p className="text-gray-400 mt-2">Manage the content of your Hero and About sections.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
        <form action={saveSiteSettingsAction} className="flex flex-col gap-8">
          <input type="hidden" name="id" value={settings?.id || "global-settings"} />
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Hero Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Hero Title</label>
                <input 
                  defaultValue={settings?.heroTitle || ""} 
                  name="heroTitle" 
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. Building Engineering Systems"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Hero Subtitle</label>
                <input 
                  defaultValue={settings?.heroSubtitle || ""} 
                  name="heroSubtitle" 
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. From Physical to Digital"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-400">Hero Description</label>
                <textarea 
                  defaultValue={settings?.heroDescription || ""} 
                  name="heroDescription" 
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. Mechanical & Electrical Engineer specializing in..."
                />
              </div>
              <div className="space-y-2 md:col-span-2 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  name="availableForWork" 
                  id="availableForWork"
                  defaultChecked={settings?.availableForWork ?? true}
                  className="w-5 h-5 bg-black border border-white/20 rounded focus:ring-zinc-500"
                />
                <label htmlFor="availableForWork" className="text-sm text-gray-300">Available for new projects (shows green dot badge)</label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">About Section</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">About Title</label>
                <input 
                  defaultValue={settings?.aboutTitle || ""} 
                  name="aboutTitle" 
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. Engineer at the intersection of worlds"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">About Text (Paragraph 1)</label>
                <textarea 
                  defaultValue={settings?.aboutText1 || ""} 
                  name="aboutText1" 
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">About Text (Paragraph 2)</label>
                <textarea 
                  defaultValue={settings?.aboutText2 || ""} 
                  name="aboutText2" 
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Contact Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input 
                  defaultValue={settings?.contactEmail || ""} 
                  name="contactEmail" 
                  type="email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. anfalblank@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">WhatsApp Number</label>
                <input 
                  defaultValue={settings?.contactPhone || ""} 
                  name="contactPhone" 
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. +6285157938871"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-400">Location Base</label>
                <input 
                  defaultValue={settings?.contactLocation || ""} 
                  name="contactLocation" 
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-zinc-700 outline-none" 
                  placeholder="e.g. Jakarta, Indonesia"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors w-full md:w-auto md:self-end mt-4"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
