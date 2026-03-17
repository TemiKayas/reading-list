import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client using service role key — never expose to browser
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

export type ReadingListItem = {
  id: string
  title: string
  author: string
  notes: string | null
  is_read: boolean
  created_at: string
  updated_at: string
}

export type CreateItemInput = {
  title: string
  author: string
  notes?: string
  is_read?: boolean
}

export type UpdateItemInput = Partial<CreateItemInput>
