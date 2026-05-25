import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { getSiteSettingsAction } from "@/server/actions/settings";
import { getSocialLinksAction } from "@/server/actions/social";
import { getExperiencesAction } from "@/server/actions/experience";
import { getPortfoliosAction } from "@/server/actions/portfolio";

export default async function Home() {
  const settings = await getSiteSettingsAction();
  const socialLinks = await getSocialLinksAction();
  const experiences = await getExperiencesAction();
  const portfolios = await getPortfoliosAction();

  return (
    <div className="flex flex-col">
      <HeroSection settings={settings} socialDynamic={socialLinks} />
      <AboutSection settings={settings} />
      <PortfolioSection portfolios={portfolios} />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection experiences={experiences} />
      <ContactSection settings={settings} />
    </div>
  );
}
