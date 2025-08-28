import type { NextApiRequest, NextApiResponse } from "next"
import { processRequest } from "@/lib/processRequest"
import { supabase } from "@/lib/supabase"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const { url } = JSON.parse(req.body)
    if (!url || typeof url !== "string" || !url.includes("twkan.com")) {
      return res.status(400).json({ error: "Missing or invalid URL" })
    }

    // Run extraction logic
    const { slug, book, chapters } = await processRequest(url)

    // Insert book metadata
    const { error: bookError } = await supabase.from("books").upsert([book])
    if (bookError) console.error("Book insert error:", bookError)

    // Insert chapters
    const { error: chapterError } = await supabase.from("chapters").upsert(chapters)
    if (chapterError) console.error("Chapter insert error:", chapterError)

    // Return slug for frontend redirect
    res.status(200).json({ success: true, slug })
  } catch (error) {
    console.error("Ingestion error:", error)
    res.status(500).json({ error: "Failed to ingest book"
