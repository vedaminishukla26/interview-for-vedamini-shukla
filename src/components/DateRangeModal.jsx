import { memo, useState, useEffect } from 'react'
import {
  addDays,
  subMonths,
  subYears,
  startOfDay,
  endOfDay,
  format,
  parseISO,
} from 'date-fns'
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
    if (!open) setRange({ from: null, to: null })
  }, [open])

  const isReady = !!(range.from && range.to)

  /* ---------------- MOBILE HELPERS ---------------- */
  const handlePresetChange = (e) => {
    const preset = presets.find((p) => p.label === e.target.value)
    if (preset) setRange(preset.range())
  }
  const handleDateChange = (key) => (e) => {
    const d = e.target.value ? parseISO(e.target.value) : null
    setRange((prev) => ({
      ...prev,
      [key]: d ? (key === 'from' ? startOfDay(d) : endOfDay(d)) : null,
    }))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        {/* ---------- MOBILE (< md) ---------- */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Preset selector */}
          <select
            defaultValue=""
            onChange={handlePresetChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="" disabled>
              Select quick range
            </option>
            {presets.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>

          {/* Manual range inputs */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="from-date" className="text-xs font-medium text-gray-600 mb-1">
                From
              </label>
              <input
                id="from-date"
                type="date"
                className="border rounded px-3 py-2"
                value={range.from ? format(range.from, 'yyyy-MM-dd') : ''}
                onChange={handleDateChange('from')}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="to-date" className="text-xs font-medium text-gray-600 mb-1">
                To
              </label>
              <input
                id="to-date"
                type="date"
                className="border rounded px-3 py-2"
                value={range.to ? format(range.to, 'yyyy-MM-dd') : ''}
                onChange={handleDateChange('to')}
              />
            </div>
          </div>
        </div>

        {/* ---------- DESKTOP (≥ md) — unchanged ---------- */}
        <div className="hidden md:flex flex-row">
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
          </div>
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="mt-4 flex gap-2 justify-end bg-white pt-2">
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
    </Modal>
  )
}

export default memo(DateRangeModal)
