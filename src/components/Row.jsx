import { memo } from 'react';

const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 text-sm border-b last:border-none">
    <span className="text-gray-600 whitespace-nowrap mr-4">{label}</span>
    <span className="text-gray-900 text-right flex-1 truncate">{value}</span>
  </div>
);

export default memo(Row); 