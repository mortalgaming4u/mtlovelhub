import { extractBook } from "@/lib/extractors/ixdzs"; // or dynamic domain matcher
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    console.log("🚀 Starting extraction for:", url);

    const { title, toc } = await extractBook(url);

    console.log("✅ Title:", title);
    console.log("📚 Chapters:", toc.length);

    const bookData = {
      title,
      chapters: toc.map((c, i) => ({
        title: c.title,
        content: c.content,
        order: i + 1
      }))
    };

    const slug = url.split("/").pop()?.replace(".html", "") || "book";
    const filePath = path.join(process.cwd(), "data", `${slug}.json`);

    fs.writeFileSync(filePath, JSON.stringify(bookData, null, 2));

    console.log("📁 Saved to:", filePath);

    res.status(200).json({ status: "success", slug });
  } catch (err) {
    console.error("❌ Extraction failed:", err);
    res.status(500).json({ error: "Extraction failed" });
  }
}
