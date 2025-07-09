import { memo } from 'react'
import Modal from './Modal'
import { useTableContext } from '../hooks/useTableContext'
import { format } from 'date-fns'
import { X, ExternalLink, Link as LinkIcon, Youtube } from 'lucide-react'
import Badge from './Badge'
import Row from './Row'

const LaunchDetailsModal = () => {
  const { activeLaunch, closeLaunch } = useTableContext()
  const l = activeLaunch
  if (!l) return null

  const payload = l.payloads?.[0] || {}
  const rocket = l.rocket || {}
  const launchpad = l.launchpad || {}

  const formattedDate = (() => {
    const d = l.date_utc ? new Date(l.date_utc) : null
    return d && !isNaN(d) ? format(d, 'dd MMMM yyyy HH:mm') : '—'
  })()

  return (
    <Modal open={!!l} onClose={closeLaunch}>
      <div className="w-[480px]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {l.links?.patch?.small && (
              <img src={l.links.patch.small} alt="patch" className="h-12 w-12" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold leading-none">{l.name}</h2>
                <Badge status={l.success === null ? 'Upcoming' : l.success ? 'Success' : 'Failed'} />
              </div>
              <p className="text-sm text-gray-500">{rocket.name}</p>
            </div>
          </div>
          <button onClick={closeLaunch} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm">
          {l.links?.webcast && (
            <a href={l.links.webcast} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-red-600">
              <Youtube className="h-4 w-4" /> YouTube
            </a>
          )}
          {l.links?.wikipedia && (
            <a href={l.links.wikipedia} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <ExternalLink className="h-4 w-4" /> Wikipedia
            </a>
          )}
          {l.links?.article && (
            <a href={l.links.article} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <LinkIcon className="h-4 w-4" /> Article
            </a>
          )}
        </div>

        <p className="text-sm text-gray-700 mb-4">
          {l.details || 'No additional description available.'}{' '}
        </p>

        <div className="mt-4">
           <Row label="Flight #" value={l.flight_number} />
           <Row label="Mission" value={l.name} />
           <Row label="Rocket Type" value={rocket.type || '—'} />
           <Row label="Rocket Name" value={rocket.name || '—'} />
           <Row label="Manufacturer" value={rocket.company || '—'} />
           <Row label="Country" value={rocket.country || '—'} />
           <Row label="Launch Date" value={formattedDate} />
           <Row label="Payload Type" value={payload.type || '—'} />
           <Row label="Orbit" value={payload.orbit || '—'} />
           <Row label="Launch Site" value={launchpad.full_name || launchpad.name || '—'} />
         </div>    
      </div>
    </Modal>
  )
}

export default memo(LaunchDetailsModal) 