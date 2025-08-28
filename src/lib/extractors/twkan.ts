import * as cheerio from 'cheerio';
import { fetchHtml } from '../utils/fetchHtml';

export async function extractTwkan(url: string) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const title = $('h1.title').text().trim();
  const chapters = [];

  $('ul.chapter-list li a').each((i, el) => {
    const chapterUrl = $(el).attr('href');
    const chapterTitle = $(el).text().trim();
    chapters.push({ title: chapterTitle, url: chapterUrl });
  });

  for (const chap of chapters) {
    const chapHtml = await fetchHtml(chap.url);
    const $$ = cheerio.load(chapHtml);
    chap.content = $$('.chapter-content').text().trim();
  }

  return { title, chapters };
}
