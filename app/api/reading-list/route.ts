import { NextRequest, NextResponse } from 'next/server'
import { supabase, CreateItemInput } from '@/lib/supabase'

// GET /api/reading-list — list all items
export async function GET() {
  const { data, error } = await supabase
    .from('reading_list')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/reading-list — create a new item
export async function POST(req: NextRequest) {
  const body: CreateItemInput = await req.json()
  const { title, author, notes, is_read = false } = body

  if (!title || !author) {
    return NextResponse.json({ error: 'title and author are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('reading_list')
    .insert({ title, author, notes: notes ?? null, is_read })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
