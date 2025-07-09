import { memo } from 'react';

const Row = ({ label, value }) => (
  <div className="flex justify-between py-1 md:py-2 text-xs md:text-sm border-b last:border-none min-w-0">
    <span className="text-gray-600 whitespace-nowrap mr-2 md:mr-4">{label}</span>
    <span className="text-gray-900 text-right flex-1 truncate break-words">{value}</span>
  </div>
);

export default memo(Row); 