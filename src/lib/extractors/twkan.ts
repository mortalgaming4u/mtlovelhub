import * as cheerio from 'cheerio';
import { fetchHtml } from '@/lib/utils';

export async function extractTwkan(bookUrl: string) {
  const html = await fetchHtml(bookUrl);
  const $ = cheerio.load(html);

  const title = $('h1').first().text().trim();
  const author = $('span:contains("作者")').next().text().trim() || 'Unknown';

  const chapters: { title: string; url: string; content?: string }[] = [];

  $('ul.chapter-list li a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && text) {
      chapters.push({
        title: text,
        url: href.startsWith('http') ? href : `https://twkan.com${href}`,
      });
    }
  });

  for (const chap of chapters) {
    const chapHtml = await fetchHtml(chap.url);
    const $$ = cheerio.load(chapHtml);
    chap.content = $$('.chapter-content').text().trim();
  }

  return { title, author, chapters };
}
