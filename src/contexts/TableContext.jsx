import { createContext, useState, useEffect, useCallback } from 'react'
import { buildLaunchQuery, buildOptions, mapLaunchDocToRow } from '@/utils/launchUtils'

const TableContext = createContext(null)

const PAGE_LIMIT = 8

const API_BASE = import.meta.env.VITE_SPACEX_API || 'https://api.spacexdata.com';

export const TableProvider = ({ children }) => {
  const [launches, setLaunches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [activeLaunch, setActiveLaunch] = useState(null)

  const fetchLaunches = useCallback(async (pageNumber = 1) => {
    setLoading(true)
    setError(null)
    try {
      const query = buildLaunchQuery({ dateRange, statusFilter })
      const res = await fetch(`${API_BASE}/v5/launches/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          options: buildOptions({ pageNumber, pageLimit: PAGE_LIMIT }),
        }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      const mapped = (data.docs || []).map((doc, idx) =>
        mapLaunchDocToRow(doc, idx, pageNumber, PAGE_LIMIT)
      )
      setLaunches(mapped)
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dateRange, statusFilter])

  useEffect(() => {
    fetchLaunches(1)
  }, [dateRange, statusFilter, fetchLaunches])

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    fetchLaunches(newPage)
  }

  const value = {
    launches,
    loading,
    error,
    page,
    totalPages,
    limit: PAGE_LIMIT,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    goToPage,
    refetchCurrent: () => fetchLaunches(page),
    activeLaunch,
    openLaunch: (launch) => setActiveLaunch(launch),
    closeLaunch: () => setActiveLaunch(null),
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export default TableContext 