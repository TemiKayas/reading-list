'use client'

import { ArrowUpDown, Clock, X, ArrowUp, ArrowDown } from 'lucide-react'
import { SortField, SortOrder, ReadFilter } from '@/app/page'

type Props = {
  sortField: SortField
  sortOrder: SortOrder
  readFilter: ReadFilter
  onSortChange: (field: SortField) => void
  onReadFilterChange: (filter: ReadFilter) => void
  onClear: () => void
}

function DirectionIcon({ order }: { order: SortOrder }) {
  return order === 'asc'
    ? <ArrowUp className="w-3 h-3" />
    : <ArrowDown className="w-3 h-3" />
}

export default function FilterBar({
  sortField, sortOrder, readFilter, onSortChange, onReadFilterChange, onClear
}: Props) {
  const isFiltered = sortField !== 'created_at' || sortOrder !== 'desc' || readFilter !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 py-2">
      <span className="text-xs text-base-content/50 font-semibold uppercase tracking-wide">Sort</span>

      {/* Alphabetical sort */}
      <button
        className={`btn btn-sm gap-1.5 ${sortField === 'title' ? 'btn-primary' : 'btn-ghost'}`}
        onClick={() => onSortChange('title')}
        title="Sort alphabetically — click again to reverse"
      >
        <ArrowUpDown className="w-3.5 h-3.5" />
        A–Z
        {sortField === 'title' && <DirectionIcon order={sortOrder} />}
      </button>

      {/* Recent sort */}
      <button
        className={`btn btn-sm gap-1.5 ${sortField === 'created_at' ? 'btn-primary' : 'btn-ghost'}`}
        onClick={() => onSortChange('created_at')}
        title="Sort by date added — click again to reverse"
      >
        <Clock className="w-3.5 h-3.5" />
        Recent
        {sortField === 'created_at' && <DirectionIcon order={sortOrder} />}
      </button>

      <div className="w-px h-5 bg-base-300 mx-1" />

      <span className="text-xs text-base-content/50 font-semibold uppercase tracking-wide">Show</span>

      {/* Read / Unread filter */}
      <select
        className="select select-bordered select-sm"
        value={readFilter}
        onChange={e => onReadFilterChange(e.target.value as ReadFilter)}
      >
        <option value="all">All</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>

      {/* Clear filters */}
      {isFiltered && (
        <button
          className="btn btn-ghost btn-sm gap-1.5 text-base-content/50"
          onClick={onClear}
          title="Reset all filters"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  )
}
