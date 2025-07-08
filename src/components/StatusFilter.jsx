import { useState, memo } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { useTableContext } from '../hooks/useTableContext'

const options = [
  { label: 'All Launches', value: 'all' },
  { label: 'Successful', value: 'success' },
  { label: 'Failed', value: 'failed' },
  { label: 'Upcoming', value: 'upcoming' },
]

const StatusFilter = () => {
  const { statusFilter, setStatusFilter } = useTableContext()
  const [open, setOpen] = useState(false)

  const current = options.find((o) => o.value === statusFilter) || options[0]

  return (
    <div className="relative inline-block text-left ml-auto">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm whitespace-nowrap">{current.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow z-20">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setStatusFilter(opt.value)
                setOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                statusFilter === opt.value ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(StatusFilter) 