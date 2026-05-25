"use server";

import { db } from "@/server/db";
import { experience } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getExperiencesAction() {
  return await db.select().from(experience).orderBy(experience.orderIndex);
}

export async function addExperienceAction(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const duration = formData.get("duration") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const isCurrent = formData.get("isCurrent") === "on";

  await db.insert(experience).values({
    id: crypto.randomUUID(),
    company,
    role,
    duration,
    location,
    description,
    isCurrent,
    orderIndex: await db.select().from(experience).then(res => res.length),
  });

  revalidatePath("/home");
  revalidatePath("/admin/experience");
}

export async function deleteExperienceAction(id: string) {
  await db.delete(experience).where(eq(experience.id, id));
  revalidatePath("/home");
  revalidatePath("/admin/experience");
}
