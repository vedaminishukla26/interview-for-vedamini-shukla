import { createContext, useState, useEffect, useCallback } from 'react'

const TableContext = createContext(null)

const PAGE_LIMIT = 8

const mapsReady = (lp, rk) => Object.keys(lp).length && Object.keys(rk).length

export const TableProvider = ({ children }) => {
  const [launches, setLaunches] = useState([])
  const [launchpadMap, setLaunchpadMap] = useState({})
  const [rocketMap, setRocketMap] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const fetchLaunches = useCallback(async (pageNumber = 1) => {
    setLoading(true)
    setError(null)
    try {
      const query = {}
      if (dateRange.from && dateRange.to) {
        query.date_utc = {
          $gte: dateRange.from.toISOString(),
          $lte: dateRange.to.toISOString(),
        }
      }
      if (statusFilter === 'success') query.success = true
      else if (statusFilter === 'failed') query.success = false
      else if (statusFilter === 'upcoming') query.upcoming = true
      const res = await fetch('https://api.spacexdata.com/v5/launches/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          options: {
            page: pageNumber,
            limit: PAGE_LIMIT,
            sort: { date_utc: 'desc' },
          },
        }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      const mapped = (data.docs || []).map((doc, idx) => ({
        no: (pageNumber - 1) * PAGE_LIMIT + idx + 1,
        lauchDate: doc.date_utc ? new Date(doc.date_utc).toLocaleString() : 'N/A',
        location: launchpadMap[doc.launchpad] ?? doc.launchpad,
        mission: doc.name,
        orbit:
          doc.payloads?.[0]?.orbit ??
          rocketMap[doc.rocket]?.orbit ?? 'N/A',
        launchStatus: doc.success === null ? 'Upcoming' : doc.success ? 'Success' : 'Failed',
        rocket: rocketMap[doc.rocket]?.name ?? doc.rocket,
      }))
      setLaunches(mapped)
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [rocketMap, launchpadMap, dateRange, statusFilter])

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [launchpadsRes, rocketsRes] = await Promise.all([
          fetch('https://api.spacexdata.com/v4/launchpads'),
          fetch('https://api.spacexdata.com/v4/rockets'),
        ])
        if (launchpadsRes.ok) {
          const lp = await launchpadsRes.json()
          const map = {}
          lp.forEach((l) => (map[l.id] = l.name || l.full_name || l.locality))
          setLaunchpadMap(map)
        }
        if (rocketsRes.ok) {
          const rk = await rocketsRes.json()
          const map = {}
          rk.forEach((r) => {
            const orbit = r.payload_weights?.[0]?.id?.toUpperCase() ?? 'N/A'
            map[r.id] = { name: r.name, orbit }
          })
          setRocketMap(map)
        }
      } catch {}
    }
    fetchMeta()
  }, [])

  useEffect(() => {
    if (mapsReady(launchpadMap, rocketMap)) {
      fetchLaunches(1)
    }
  }, [launchpadMap, rocketMap, dateRange, fetchLaunches])

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
    launchpadMap,
    rocketMap,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    goToPage,
    refetchCurrent: () => fetchLaunches(page),
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export default TableContext 