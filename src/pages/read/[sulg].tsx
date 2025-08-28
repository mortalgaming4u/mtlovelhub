import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBookmark, setBookmark } from "@/lib/bookmark";

const ReadPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [chapters, setChapters] = useState<string[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  // Fetch chapters + restore bookmark
  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const fetchChapters = async () => {
      try {
        const res = await fetch(`/api/extract?slug=${slug}`);
        const data = await res.json();
        setChapters(data.chapters || []);

        const savedIndex = getBookmark(slug);
        if (savedIndex !== null && !isNaN(savedIndex)) {
          setSelectedChapter(savedIndex);
        } else {
          setSelectedChapter(0); // default to first chapter
        }
      } catch (err) {
        console.error("Failed to fetch chapters:", err);
      }
    };

    fetchChapters();
  }, [slug]);

  // Handle chapter selection
  const handleSelectChapter = (index: number) => {
    setSelectedChapter(index);
    if (slug && typeof slug === "string") {
      setBookmark(slug, index);
    }
  };

  return (
    <div>
      <h1>Reading: {slug}</h1>
      <ul>
        {chapters.map((chapter, index) => (
          <li
            key={index}
            onClick={() => handleSelectChapter(index)}
            style={{
              cursor: "pointer",
              fontWeight: index === selectedChapter ? "bold" : "normal",
            }}
          >
            Chapter {index + 1}
          </li>
        ))}
      </ul>

      {selectedChapter !== null && (
        <div>
          <h2>Chapter {selectedChapter + 1}</h2>
          <p>{chapters[selectedChapter]}</p>
        </div>
      )}
    </div>
  );
};

export default ReadPage;
