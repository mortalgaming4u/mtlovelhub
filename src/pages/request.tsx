import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const RequestPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const extractSlugFromUrl = (url: string): string => {
    const match = url.match(/book\\/(\\d+)/);
    return match ? match[1] : "unknown";
  };

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

      const slug = extractSlugFromUrl(url);
      navigate(`/read/${slug}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Novel Request Form</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
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
        {loading && (
          <p className="text-sm text-muted-foreground">Processing request...</p>
        )}
      </form>
    </div>
  );
};

export default RequestPage;
