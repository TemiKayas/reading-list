import { NextRequest, NextResponse } from 'next/server'
import { supabase, UpdateItemInput } from '@/lib/supabase'

// PATCH /api/reading-list/[id] — update an item
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body: UpdateItemInput = await req.json()

  if (Object.keys(body).length === 0) {
    return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('reading_list')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  return NextResponse.json(data)
}

// DELETE /api/reading-list/[id] — delete an item
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await supabase
    .from('reading_list')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
