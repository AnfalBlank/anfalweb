"use server";

import { db } from "@/server/db";
import { portfolio } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function getPortfoliosAction() {
  return await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));
}

export async function addPortfolioAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techString = formData.get("tech") as string;
  const year = formData.get("year") as string;
  const category = formData.get("category") as string;
  
  const techArray = techString.split(",").map((s) => s.trim());

  await db.insert(portfolio).values({
    id: crypto.randomUUID(),
    title,
    description,
    tech: techArray,
    year,
    category,
    images: ["/dummy.jpg"], // dummy
    gradient: "from-zinc-900 via-neutral-900 to-zinc-900", // dummy
    createdAt: new Date(),
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/#portfolio");
}

export async function deletePortfolioAction(id: string) {
  await db.delete(portfolio).where(eq(portfolio.id, id));
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
