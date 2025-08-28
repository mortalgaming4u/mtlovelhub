import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { slug } = req.query;
  const filePath = path.join(process.cwd(), "data", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Book not found" });
  }

  const bookData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json(bookData);
}
