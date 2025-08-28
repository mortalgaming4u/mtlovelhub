// pages/api/request.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { processRequest } from "@/lib/processRequest";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = JSON.parse(req.body);

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Missing or invalid slug" });
  }

  try {
    const result = await processRequest(slug);
    // Optional: write to Supabase or cache
    res.status(200).json({ success: true, chapters: result.chapters });
  } catch (error) {
    console.error("Ingestion error:", error);
    res.status(500).json({ error: "Failed to ingest book" });
  }
}
