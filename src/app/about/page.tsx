import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { getSiteSettingsAction } from "@/server/actions/settings";
import { getExperiencesAction } from "@/server/actions/experience";
import { EducationSection } from "@/components/sections/EducationSection";

export const metadata = {
  title: "About Me | Anfal Hidayat"
};

export default async function AboutPage() {
  const settings = await getSiteSettingsAction();
  const experiences = await getExperiencesAction();

  return (
    <div className="flex flex-col pt-32 min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 mb-10 border-b border-white/10 pb-10">
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight mb-4 border-l-4 border-white pl-6">
          Detailed Background
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl pl-6">
          A comprehensive look into my career history, engineering background, and professional journey.
        </p>
      </div>
      <AboutSection settings={settings} />
      <EducationSection />
      <ExperienceSection experiences={experiences} />
    </div>
  );
}
