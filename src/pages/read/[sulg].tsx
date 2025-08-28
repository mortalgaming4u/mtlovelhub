import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Chapter = { title: string; content: string };
type BookData = { title: string; author?: string; chapters: Chapter[] };

export default function ReadBookPage() {
  const { query } = useRouter();
  const { slug } = query;
  const [book, setBook] = useState<BookData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);

  useEffect(() => {
    if (typeof slug === "string") {
      fetch(`/api/book/${slug}`)
        .then(res => res.json())
        .then(data => setBook(data))
        .catch(err => console.error("Failed to load book:", err));
    }
  }, [slug]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      {book.author && <p className="text-gray-600 mb-4">by {book.author}</p>}

      <div className="flex gap-4">
        <aside className="w-1/3 border-r pr-4">
          <h2 className="text-xl font-semibold mb-2">Chapters</h2>
          <ul className="space-y-1">
            {book.chapters.map((ch, i) => (
              <li key={i}>
                <button
                  className={`text-left w-full ${i === selectedChapter ? "font-bold" : ""}`}
                  onClick={() => setSelectedChapter(i)}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-2/3 pl-4">
          <h2 className="text-xl font-semibold mb-2">{book.chapters[selectedChapter].title}</h2>
          <div className="whitespace-pre-wrap">{book.chapters[selectedChapter].content}</div>
        </main>
      </div>
    </div>
  );
}
