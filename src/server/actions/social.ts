"use server";

import { db } from "@/server/db";
import { socialLinks } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function getSocialLinksAction() {
  const links = await db.select().from(socialLinks).orderBy(socialLinks.orderIndex);
  return links;
}

export async function saveFixedSocialLinksAction(formData: FormData) {
  // 5 fixed platforms mapping to their lucide icon names
  const fixedPlatforms = [
    { platform: "LinkedIn", name: "linkedin", iconName: "Linkedin" },
    { platform: "Instagram", name: "instagram", iconName: "Instagram" },
    { platform: "Facebook", name: "facebook", iconName: "Facebook" },
    { platform: "Threads", name: "threads", iconName: "Hash" }, // Optional: "Hash" or another Lucide icon for Threads if it's not present
    { platform: "YouTube", name: "youtube", iconName: "Youtube" },
  ];

  // delete all existing ones first
  await db.delete(socialLinks);

  for (let i = 0; i < fixedPlatforms.length; i++) {
    const p = fixedPlatforms[i];
    const url = formData.get(p.name) as string;
    
    if (url && url.trim() !== "") {
      await db.insert(socialLinks).values({
        id: crypto.randomUUID(),
        platform: p.platform,
        url: url.trim(),
        iconName: p.iconName,
        orderIndex: i,
      });
    }
  }

  revalidatePath("/home");
  revalidatePath("/admin/social");
}
