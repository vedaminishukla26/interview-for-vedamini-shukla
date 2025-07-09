import { memo } from 'react'
import Badge from '@/components/Badge'
import { formatUtcDate } from '@/utils/dateUtils'

const LaunchCard = ({ launch, onPress }) => {
  return (
    <button
      onClick={() => onPress(launch.raw || launch)}
      className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 truncate mr-2">{launch.mission}</h3>
        <Badge status={launch.launchStatus} />
      </div>
      <p className="text-xs text-gray-500">Flight #{launch.no} • {formatUtcDate(launch.raw?.date_utc)}</p>
      <p className="text-sm text-gray-700 truncate"><span className="font-medium">Rocket:</span> {launch.rocket}</p>
      <p className="text-sm text-gray-700 truncate"><span className="font-medium">Site:</span> {launch.location}</p>
    </button>
  )
}

export default memo(LaunchCard) 