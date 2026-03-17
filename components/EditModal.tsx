'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Save } from 'lucide-react'
import { ReadingListItem } from '@/lib/supabase'

type Props = {
  item: ReadingListItem
  onUpdated: (item: ReadingListItem) => void
  onClose: () => void
}

export default function EditModal({ item, onUpdated, onClose }: Props) {
  const [title, setTitle] = useState(item.title)
  const [author, setAuthor] = useState(item.author)
  const [notes, setNotes] = useState(item.notes ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`/api/reading-list/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, notes: notes || null }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    onUpdated(data)
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg">Edit Item</h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          {error && <div className="alert alert-error text-sm py-2">{error}</div>}

          <label className="form-control">
            <div className="label pb-1"><span className="label-text text-xs font-medium">Title <span className="text-error">*</span></span></div>
            <input
              className="input input-bordered input-sm"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="form-control">
            <div className="label pb-1"><span className="label-text text-xs font-medium">Author <span className="text-error">*</span></span></div>
            <input
              className="input input-bordered input-sm"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </label>

          <label className="form-control">
            <div className="label pb-1"><span className="label-text text-xs font-medium">Notes <span className="text-base-content/40">(optional)</span></span></div>
            <textarea
              className="textarea textarea-bordered textarea-sm"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
            />
          </label>

          <div className="modal-action mt-2">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading
                ? <span className="loading loading-spinner loading-xs" />
                : <Save className="w-4 h-4" />
              }
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
