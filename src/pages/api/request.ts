// pages/api/request.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { processRequest } from "@/lib/processRequest";
import { supabase } from "@/lib/supabase"; // ✅ Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = JSON.parse(req.body);

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Missing or invalid slug" });
  }

  try {
    const result = await processRequest(slug);

    // ✅ Log submitted slug to Supabase
    const { error } = await supabase.from("books").insert({ slug });
    if (error) console.error("Supabase insert error:", error);

    res.status(200).json({ success: true, chapters: result.chapters });
  } catch (error) {
    console.error("Ingestion error:", error);
    res.status(500).json({ error: "Failed to ingest book" });
  }
}
