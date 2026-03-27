import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", // Your Elysia URL
    trustedOrigins: ["http://localhost:5173"],
});