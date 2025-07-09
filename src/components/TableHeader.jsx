import { memo } from 'react';
import tableColumns from '../constants/tableColumns';

const TableHeader = () => {
    return (
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200 text-gray-600 text-xs font-medium sticky top-0 z-10">
            {tableColumns.map((col) => (
                <div key={col.key} className={col.headerClass}>
                    {col.label}
                </div>
            ))}
        </div>
    );
};

export default memo(TableHeader);