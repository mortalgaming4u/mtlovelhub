import { scrapeBook } from '@/lib/extractors';
import { supabase } from '@/lib/supabase/client';

export default async function handler(req, res) {
  const { data: requests, error } = await supabase
    .from('requests')
    .select('*')
    .eq('status', 'pending');

  if (error) return res.status(500).json({ error: error.message });

  for (const request of requests) {
    try {
      const book = await scrapeBook(request.url);

      const { data: novel, error: novelError } = await supabase
        .from('novels')
        .insert({
          title: book.title,
          author: book.author,
          source_url: request.url,
        })
        .select()
        .single();

      if (novelError) throw new Error(novelError.message);

      const chapters = book.chapters.map((chap, i) => ({
        novel_id: novel.id,
        index: i,
        title: chap.title,
        content: chap.content,
      }));

      const { error: chapterError } = await supabase
        .from('chapters')
        .insert(chapters);

      if (chapterError) throw new Error(chapterError.message);

      await supabase
        .from('requests')
        .update({ status: 'completed', title: book.title })
        .eq('id', request.id);
    } catch (err) {
      await supabase
        .from('requests')
        .update({ status: 'rejected', notes: err.message })
        .eq('id', request.id);
    }
  }

  res.status(200).json({ message: 'Scraping complete' });
}
