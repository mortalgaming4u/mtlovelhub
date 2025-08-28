import { extractTwkan } from './twkan';
import { extractPiaotia } from './piaotia';

export async function scrapeBook(url: string) {
  const domain = new URL(url).hostname;

  if (domain.includes('twkan.com')) return await extractTwkan(url);
  if (domain.includes('piaotia.com')) return await extractPiaotia(url);

  throw new Error(`Unsupported domain: ${domain}`);
}
