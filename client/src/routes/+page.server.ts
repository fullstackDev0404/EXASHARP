import { treaty } from "@elysiajs/eden";
import type { App } from "../../../server/src/index";
import type { PageServerLoad } from "./$types";

const API_URL = process.env.VITE_API_URL ?? 'http://localhost:3000';
const api = treaty<App>(API_URL);

export const load: PageServerLoad = async () => {
  const { data, error } = await api.get();

  if (error) {
    return { backendMessage: "Backend is offline" };
  }

  return { backendMessage: data };
};
