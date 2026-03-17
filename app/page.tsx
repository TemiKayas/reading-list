'use client'

import { useState, useEffect, useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import { ReadingListItem } from '@/lib/supabase'
import AddItemForm from '@/components/AddItemForm'
import EditModal from '@/components/EditModal'
import FilterBar from '@/components/FilterBar'
import ReadingListRow from '@/components/ReadingListRow'

export type SortField = 'title' | 'created_at'
export type SortOrder = 'asc' | 'desc'
export type ReadFilter = 'all' | 'read' | 'unread'

export default function Home() {
  const [items, setItems] = useState<ReadingListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [readFilter, setReadFilter] = useState<ReadFilter>('all')
  const [editingItem, setEditingItem] = useState<ReadingListItem | null>(null)

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/reading-list')
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const displayedItems = useMemo(() => {
    let filtered = [...items]

    if (readFilter !== 'all') {
      filtered = filtered.filter(i => readFilter === 'read' ? i.is_read : !i.is_read)
    }

    filtered.sort((a, b) => {
      const cmp = sortField === 'title'
        ? a.title.localeCompare(b.title)
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      return sortOrder === 'asc' ? cmp : -cmp
    })

    return filtered
  }, [items, sortField, sortOrder, readFilter])

  async function handleDelete(id: string) {
    await fetch(`/api/reading-list/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  async function handleToggleRead(item: ReadingListItem) {
    const res = await fetch(`/api/reading-list/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: !item.is_read }),
    })
    const updated = await res.json()
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
  }

  function handleSortChange(field: SortField) {
    if (sortField === field) {
      setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder(field === 'created_at' ? 'desc' : 'asc')
    }
  }

  function handleClearFilters() {
    setSortField('created_at')
    setSortOrder('desc')
    setReadFilter('all')
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold text-base-content">Reading List</h1>
          <span className="badge badge-neutral ml-1">{items.length}</span>
        </div>

        {/* Add item inline form */}
        <AddItemForm onCreated={item => setItems(prev => [item, ...prev])} />

        {/* Filter / sort bar */}
        <FilterBar
          sortField={sortField}
          sortOrder={sortOrder}
          readFilter={readFilter}
          onSortChange={handleSortChange}
          onReadFilterChange={setReadFilter}
          onClear={handleClearFilters}
        />

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center text-center py-16 text-base-content/40">
              <BookOpen className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-lg font-medium">No items found</p>
              <p className="text-sm">
                {items.length > 0 ? 'Try adjusting your filters.' : 'Add your first book above to get started.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-base-200">
              {displayedItems.map(item => (
                <ReadingListRow
                  key={item.id}
                  item={item}
                  onEdit={() => setEditingItem(item)}
                  onDelete={() => handleDelete(item.id)}
                  onToggleRead={() => handleToggleRead(item)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {editingItem && (
        <EditModal
          item={editingItem}
          onUpdated={updated => {
            setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
            setEditingItem(null)
          }}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  )
}
