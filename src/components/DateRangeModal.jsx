import { memo, useState, useEffect } from 'react'
import { addDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns'
import Modal from '@/components/Modal'
import CustomRangeCalendar from '@/components/CustomRangeCalendar'
import { useTableContext } from '@/hooks/useTableContext'

const presets = [
  { label: 'Past week', range: () => ({ from: startOfDay(addDays(new Date(), -7)), to: endOfDay(new Date()) }) },
  { label: 'Past month', range: () => ({ from: startOfDay(subMonths(new Date(), 1)), to: endOfDay(new Date()) }) },
  { label: 'Past 3 months', range: () => ({ from: startOfDay(subMonths(new Date(), 3)), to: endOfDay(new Date()) }) },
  { label: 'Past 6 months', range: () => ({ from: startOfDay(subMonths(new Date(), 6)), to: endOfDay(new Date()) }) },
  { label: 'Past year', range: () => ({ from: startOfDay(subYears(new Date(), 1)), to: endOfDay(new Date()) }) },
  { label: 'Past 2 years', range: () => ({ from: startOfDay(subYears(new Date(), 2)), to: endOfDay(new Date()) }) },
]

const DateRangeModal = ({ open, onClose }) => {
  const { setDateRange } = useTableContext()
  const [range, setRange] = useState({ from: null, to: null })

  const apply = (r) => {
    setDateRange({ from: r.from, to: r.to })
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setRange({ from: null, to: null })
    }
  }, [open])

  const isReady = !!(range.from && range.to);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex">
        <ul className="pr-4 border-r space-y-2 text-sm">
          {presets.map((p) => (
            <li key={p.label}>
              <button onClick={() => apply(p.range())} className="hover:underline">
                {p.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="pl-4">
          <CustomRangeCalendar selectedRange={range} onSelect={setRange} />
          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={() => apply(range)}
              disabled={!isReady}
              className={`py-1 px-4 rounded font-medium transition-colors
              ${isReady
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Apply
            </button>
            <button
              onClick={() => apply({ from: null, to: null })}
              className="px-3 py-1 text-sm underline"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default memo(DateRangeModal) 