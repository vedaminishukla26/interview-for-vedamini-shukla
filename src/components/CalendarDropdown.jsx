import { useState, memo } from 'react'
import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'
import DateRangeModal from './DateRangeModal'
import { useTableContext } from '../hooks/useTableContext'

function CalendarDropdown() {
  const { dateRange } = useTableContext()
  const [open, setOpen] = useState(false)

  const label = !dateRange.from
    ? 'Select dates'
    : !dateRange.to
    ? format(dateRange.from, 'MMM d, yyyy')
    : `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
      >
        <CalendarDays className="w-4 h-4" />
        <span className="text-sm whitespace-nowrap">{label}</span>
      </button>

      <DateRangeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default memo(CalendarDropdown)
