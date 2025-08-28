import { useState } from "react";
import { useRouter } from "next/router";

export default function RequestPage() {
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/read/${encodeURIComponent(slug)}`);
      } else {
        alert("Failed to ingest book");
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Submit Book URL</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter book URL (e.g. https://ixdzs.tw/...)"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
