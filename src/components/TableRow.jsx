const TableRow = ({ item }) => {

    return (
        <div
            className={`flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors`}
        >
            <div className="w-12 flex-shrink-0 px-2 text-gray-700 text-sm">
                {item.no}
            </div>
            <div className="flex-1 px-2 min-w-0">
                <div className="text-gray-900 text-sm font-medium truncate">
                    {item.lauchDate}
                </div>
            </div>
            <div className="flex-1 px-2 text-gray-700 text-sm truncate">
                {item.location}
            </div>
            <div className="flex-1 px-2 text-gray-700 text-sm truncate">
                {item.mission}
            </div>
            <div className="flex-1 px-2 text-gray-700 text-sm truncate">
                {item.orbit}
            </div>
            <div className="flex-1 px-2 py-2 text-sm truncate">
                <span
                  className={`px-2 py-1 rounded-full text-xs  font-medium ${
                    item.launchStatus === 'Failed'
                      ? 'bg-[#FDE2E1] text-red-800'
                      : item.launchStatus === 'Success'
                      ? 'bg-[#DEF7EC] text-green-800'
                      : item.launchStatus === 'Upcoming'
                      ? 'bg-[#FEF3C7] text-yellow-800'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {item.launchStatus}
                </span>
            </div>
            <div className="flex-1 px-2 text-gray-700 text-sm truncate">
                {item.rocket}
            </div>
        </div>
    );
};

export default TableRow;