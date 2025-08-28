import { createClient } from "@supabase/supabase-js";
import { twkanExtractor } from "../extractors/twkan";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

async function processRequests() {
  const { data: requests } = await supabase
    .from("requests")
    .select("*")
    .eq("status", "pending");

  for (const req of requests || []) {
    try {
      await supabase.from("requests").update({ status: "processing" }).eq("id", req.id);

      const result = await twkanExtractor(req.url); // your logic

      await supabase.from("novels").insert(result); // or chapters
      await supabase.from("requests").update({ status: "done" }).eq("id", req.id);
    } catch (err) {
      await supabase.from("requests").update({ status: "error" }).eq("id", req.id);
    }
  }
}

processRequests();
