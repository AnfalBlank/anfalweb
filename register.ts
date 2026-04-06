import { auth } from "./src/server/auth";

async function register() {
  console.log("Registering user...");
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "anfalblank@gmail.com",
        password: "0411843528Blank",
        name: "Anfal Hidayat"
      }
    });
    console.log("Registered successfully:", user);
  } catch (error) {
    console.error("Failed to register:", error);
  }
}

register();
