import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const RequestPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const extractSlugFromUrl = (url: string): string => {
    const match = url.match(/book\/(\d+)/);
    return match ? match[1] : "unknown";
  };

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("url, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) setLogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.match(/^https?:\/\/(www\.)?twkan\.com\/book\/\d+\.html$/)) {
      toast.error("Please enter a valid twkan.com book URL.");
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
      fetchLogs(); // Refresh logs after submission

      const slug = extractSlugFromUrl(url);
      navigate(`/read/${slug}`);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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
          required
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

      {/* Logs Box */}
      <div className="mt-8 w-full max-w-md p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">📜 Recent Requests</h2>
        <ul className="text-sm space-y-1">
          {logs.map((log, i) => (
            <li key={i}>
              <span className="font-mono">{log.url}</span> —{" "}
              <span className="text-gray-500">
                {new Date(log.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequestPage;
