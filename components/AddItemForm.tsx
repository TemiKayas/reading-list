'use client'

import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { ReadingListItem } from '@/lib/supabase'

type Props = { onCreated: (item: ReadingListItem) => void }

export default function AddItemForm({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/reading-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, notes: notes || undefined }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    onCreated(data)
    setTitle('')
    setAuthor('')
    setNotes('')
    setOpen(false)
  }

  return (
    <div className="card bg-base-100 shadow-sm mb-4">
      <div className="card-body p-4">
        <button
          className="flex items-center justify-between w-full text-left group"
          onClick={() => setOpen(o => !o)}
        >
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Plus className="w-4 h-4" />
            Add New Item
          </div>
          {open
            ? <ChevronUp className="w-4 h-4 text-base-content/40 group-hover:text-base-content transition-colors" />
            : <ChevronDown className="w-4 h-4 text-base-content/40 group-hover:text-base-content transition-colors" />
          }
        </button>

        {open && (
          <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
            {error && <div className="alert alert-error text-sm py-2">{error}</div>}

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="form-control">
                <div className="label pb-1"><span className="label-text text-xs font-medium">Title <span className="text-error">*</span></span></div>
                <input
                  className="input input-bordered input-sm"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. The Pragmatic Programmer"
                  required
                />
              </label>
              <label className="form-control">
                <div className="label pb-1"><span className="label-text text-xs font-medium">Author <span className="text-error">*</span></span></div>
                <input
                  className="input input-bordered input-sm"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. Andrew Hunt"
                  required
                />
              </label>
            </div>

            <label className="form-control">
              <div className="label pb-1"><span className="label-text text-xs font-medium">Notes <span className="text-base-content/40">(optional)</span></span></div>
              <textarea
                className="textarea textarea-bordered textarea-sm"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any notes about this book..."
                rows={2}
              />
            </label>

            <div className="flex justify-end gap-2 mt-1">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                {loading
                  ? <span className="loading loading-spinner loading-xs" />
                  : <Plus className="w-4 h-4" />
                }
                Add to List
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
