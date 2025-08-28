// pages/api/logs.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('books')
    .select('url, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) return res.status(500).json({ error })
  res.status(200).json(data)
}
