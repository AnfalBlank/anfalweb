import { getSocialLinksAction, saveFixedSocialLinksAction } from "@/server/actions/social";
import { Save } from "lucide-react";

export default async function SocialPage() {
  const links = await getSocialLinksAction();

  // Helper to get existing URL by platform
  const getUrl = (platformName: string) => {
    return links.find(l => l.platform.toLowerCase() === platformName.toLowerCase())?.url || "";
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Social Links</h1>
          <p className="text-gray-400 mt-2">Manage your primary social media profiles.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
        <form action={saveFixedSocialLinksAction} className="flex flex-col gap-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">LinkedIn URL</label>
            <input 
              name="linkedin" 
              type="url"
              defaultValue={getUrl("LinkedIn")}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-700 outline-none transition-colors" 
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Instagram URL</label>
            <input 
              name="instagram" 
              type="url"
              defaultValue={getUrl("Instagram")}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-700 outline-none transition-colors" 
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Facebook URL</label>
            <input 
              name="facebook" 
              type="url"
              defaultValue={getUrl("Facebook")}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-700 outline-none transition-colors" 
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Threads URL</label>
            <input 
              name="threads" 
              type="url"
              defaultValue={getUrl("Threads")}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-700 outline-none transition-colors" 
              placeholder="https://threads.net/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">YouTube URL</label>
            <input 
              name="youtube" 
              type="url"
              defaultValue={getUrl("YouTube")}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-700 outline-none transition-colors" 
              placeholder="https://youtube.com/..."
            />
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
