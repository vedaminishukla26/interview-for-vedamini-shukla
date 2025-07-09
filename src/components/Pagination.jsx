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
    <div className="flex justify-center md:justify-end items-center gap-0.5 md:gap-2 mt-4 px-2 md:px-4 pb-4 whitespace-nowrap max-w-full mx-auto">
      <button
        className="px-2 py-1 md:px-3 md:py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 border border-gray-300 hover:border-blue-500 text-xs md:text-sm"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
      </button>
      {visiblePages.map((p, idx) => (
        <React.Fragment key={`page-${p}`}>
          {idx > 0 && p - visiblePages[idx - 1] > 1 && (
            <span className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm text-gray-500">…</span>
          )}
          <button onClick={() => goToPage(p)} className={`${btnClass(p)} text-xs md:text-sm px-2 py-1 md:px-4 md:py-2`}>
            {p}
          </button>
        </React.Fragment>
      ))}
      <button
        className="px-2 py-1 md:px-3 md:py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 border border-gray-300 hover:border-blue-500 text-xs md:text-sm"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
      </button>
    </div>
  )
}

export default memo(Pagination)