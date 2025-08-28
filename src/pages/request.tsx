// src/pages/request.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // adjust path if needed
import { toast } from "sonner";

const RequestPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.includes("twkan.com")) {
      toast.error("Only twkan.com URLs are supported for now.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("requests").insert([{ url }]);
    setLoading(false);

    if (error) {
      toast.error("Failed to submit request.");
    } else {
      toast.success("Request submitted successfully!");
      setUrl("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Novel Request Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste twkan.com URL here"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestPage;
