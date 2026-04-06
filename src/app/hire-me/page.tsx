import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteSettingsAction } from "@/server/actions/settings";

export const metadata = {
  title: "Hire Me | Anfal Hidayat"
};

export default async function HireMePage() {
  const settings = await getSiteSettingsAction();

  return (
    <div className="flex flex-col pt-32 min-h-screen items-center text-center">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10">
        <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
          Hire Me
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          I am currently available for new projects, full-time roles, or consulting. Drop me a message below, and let's discuss how we can build something amazing together.
        </p>
      </div>
      <div className="w-full">
        <ContactSection settings={settings} />
      </div>
    </div>
  );
}
