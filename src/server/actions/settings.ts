"use server";

import { db } from "@/server/db";
import { siteSettings } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSiteSettingsAction() {
  const settings = await db.select().from(siteSettings).limit(1);
  return settings[0] || null;
}

export async function saveSiteSettingsAction(formData: FormData) {
  const idValue = formData.get("id") as string;
  const heroTitle = formData.get("heroTitle") as string;
  const heroSubtitle = formData.get("heroSubtitle") as string;
  const heroDescription = formData.get("heroDescription") as string;
  const aboutTitle = formData.get("aboutTitle") as string;
  const aboutText1 = formData.get("aboutText1") as string;
  const aboutText2 = formData.get("aboutText2") as string;
  const availableForWork = formData.get("availableForWork") === "on";
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const contactLocation = formData.get("contactLocation") as string;

  const data = {
    heroTitle,
    heroSubtitle,
    heroDescription,
    aboutTitle,
    aboutText1,
    aboutText2,
    availableForWork,
    contactEmail,
    contactPhone,
    contactLocation,
    updatedAt: new Date(),
  };

  if (idValue) {
    await db.update(siteSettings).set(data).where(eq(siteSettings.id, idValue));
  } else {
    await db.insert(siteSettings).values({
      id: "global-settings",
      ...data,
    });
  }

  revalidatePath("/home");
  revalidatePath("/admin/settings");
}
