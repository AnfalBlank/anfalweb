import { auth } from "@/server/auth"; // path to your auth file
import { nextCookies } from "better-auth/next-js";

export const GET = auth.handler;
export const POST = auth.handler;
