import { memo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTableContext } from '../hooks/useTableContext'
import React from 'react'

const Pagination = () => {
  const { page, totalPages, goToPage } = useTableContext()

  if (totalPages <= 1) return null

  const pagesToShow = () => {
    const pages = new Set()

    const add = (p) => {
      if (p >= 1 && p <= totalPages) pages.add(p)
    }

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) add(i)
    } else if (page <= 2) {
      for (let i = 1; i <= 3; i++) add(i)
      add(totalPages)
    } else if (page >= totalPages - 1) {
      add(1)
      for (let i = totalPages - 2; i <= totalPages; i++) add(i)
    } else {
      add(1)
      for (let i = page - 1; i <= page + 1; i++) add(i)
      add(totalPages)
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

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
        {pagesToShow().map((p, idx, arr) => (
          <React.Fragment key={`page-${p}`}>
            {idx > 0 && p - arr[idx - 1] > 1 && (
              <span key={`ellipsis-${idx}`} className="px-4 py-2 text-sm text-gray-500">
                ...
              </span>
            )}
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={btnClass(p)}
            >
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