import { useTableContext } from '@/hooks/useTableContext'
import Badge from '@/components/Badge'
import tableColumns from '@/constants/tableColumns'

const TableRow = ({ item }) => {
    const { openLaunch } = useTableContext()

    return (
        <div
            onClick={() => openLaunch(item.raw || item)}
            className="flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        >
            {tableColumns.map((col) => (
                <div key={col.key} className={col.cellClass}>
                    {col.key === 'launchStatus' ? (
                        <Badge status={item[col.key]} />
                    ) : col.key === 'lauchDate' ? (
                        <div className="text-gray-900 text-sm font-medium truncate">{item[col.key]}</div>
                    ) : (
                        <span className="truncate">{item[col.key]}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableRow;