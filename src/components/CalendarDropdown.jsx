import { useState, memo } from 'react'
import { CalendarDays } from 'lucide-react'
import DateRangeModal from '@/components/DateRangeModal'
import { useTableContext } from '@/hooks/useTableContext'
import { dateRangeLabel } from '@/utils/dateUtils'

function CalendarDropdown() {
  const { dateRange } = useTableContext()
  const [open, setOpen] = useState(false)

  const label = dateRangeLabel(dateRange)

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
