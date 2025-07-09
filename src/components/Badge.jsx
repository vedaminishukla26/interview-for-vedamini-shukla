import { memo } from 'react';

const statusStyles = {
  Failed: 'bg-[#FDE2E1] text-red-800',
  Success: 'bg-[#DEF7EC] text-green-800',
  Upcoming: 'bg-[#FEF3C7] text-yellow-800',
};

const Badge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      statusStyles[status] || 'bg-gray-200 text-gray-700'
    }`}
  >
    {status}
  </span>
);

export default memo(Badge); 