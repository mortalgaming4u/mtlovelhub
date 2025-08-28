// src/pages/api/process.ts (or /api/process.ts if using Vercel's root-based routing)
import { processRequests } from "@/lib/requestProcess";

export default async function handler(req, res) {
  await processRequests();
  res.status(200).json({ status: "ok" });
}
