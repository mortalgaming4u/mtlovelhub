import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

/**
 * Fetches chapters for a given slug from the Supabase `novels` table.
 * Used by /api/extract endpoint to serve chapters to the reader page.
 */
export async function processRequest(slug: string) {
  if (!slug) {
    throw new Error("Missing slug");
  }

  const { data, error } = await supabase
    .from("novels")
    .select("chapters")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Supabase fetch error:", error);
    throw new Error("Chapters not found");
  }

  return { chapters: data.chapters };
}
