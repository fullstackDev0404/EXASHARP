import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
  const cookie = request.headers.get("cookie") ?? "";

  try {
    const res = await fetch("http://localhost:3000/api/me", {
      headers: { cookie },
    });

    if (res.ok) {
      const data = await res.json();
      const userCompanies = data.companies || [];
      const primaryCompany = userCompanies[0]?.company || null;

      return {
        user: data.user,
        session: data.user,
        companies: userCompanies.map((c: any) => c.company),
        currentCompany: primaryCompany,
      };
    }
  } catch (e) {
    console.error("Session fetch error:", e);
  }

  return {
    user: null,
    session: null,
    companies: [],
    currentCompany: null,
  };
};
