import { memo, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTableContext } from '@/hooks/useTableContext'
import React from 'react'
import computePagesToShow from '@/utils/paginationUtils'

const Pagination = () => {
  const { page, totalPages, goToPage } = useTableContext()

  if (totalPages <= 1) return null

  const visiblePages = useMemo(
    () => computePagesToShow({ page, totalPages }),
    [page, totalPages]
  )

  const btnClass = (p) =>
    `px-4 py-2 text-sm border border-gray-300 hover:border-blue-500 transition-colors ${
      p === page ? 'font-semibold text-gray-900' : 'text-gray-500'
    }`

  return (
    <div className="flex justify-end items-center gap-2 mt-4 px-4 pb-4 flex-wrap">
      <button
        className="px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 border border-gray-300 hover:border-blue-500"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {visiblePages.map((p, idx) => (
        <React.Fragment key={`page-${p}`}>
          {idx > 0 && p - visiblePages[idx - 1] > 1 && (
            <span className="px-4 py-2 text-sm text-gray-500">…</span>
          )}
          <button onClick={() => goToPage(p)} className={btnClass(p)}>
            {p}
          </button>
        </React.Fragment>
      ))}
      <button
        className="px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 border border-gray-300 hover:border-blue-500"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export default memo(Pagination)