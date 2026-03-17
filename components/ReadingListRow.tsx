'use client'

import { Pencil, Trash2, BookOpen, BookMarked } from 'lucide-react'
import { ReadingListItem } from '@/lib/supabase'

type Props = {
  item: ReadingListItem
  onEdit: () => void
  onDelete: () => void
  onToggleRead: () => void
}

export default function ReadingListRow({ item, onEdit, onDelete, onToggleRead }: Props) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-base-200/50 transition-colors">

      {/* Read/Unread badge */}
      <div className="flex-shrink-0 w-16">
        <span className={`badge badge-sm font-medium ${item.is_read ? 'badge-success' : 'badge-ghost text-base-content/50'}`}>
          {item.is_read ? 'Read' : 'Unread'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base-content leading-snug truncate">{item.title}</p>
        <p className="text-sm text-base-content/60 truncate">{item.author}</p>
        {item.notes && (
          <p className="text-xs text-base-content/40 mt-0.5 truncate">{item.notes}</p>
        )}
      </div>

      {/* Date added */}
      <div className="hidden sm:block text-xs text-base-content/35 flex-shrink-0 w-20 text-right">
        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          className={`btn btn-ghost btn-xs ${item.is_read ? 'text-base-content/30 hover:text-warning' : 'text-success hover:text-success/70'}`}
          onClick={onToggleRead}
          title={item.is_read ? 'Mark as unread' : 'Mark as read'}
        >
          {item.is_read ? <BookMarked className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
        </button>
        <button
          className="btn btn-ghost btn-xs text-base-content/30 hover:text-primary"
          onClick={onEdit}
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="btn btn-ghost btn-xs text-base-content/30 hover:text-error"
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
