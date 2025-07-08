const TableHeader = () => {
    return (
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 text-gray-600 text-xs font-medium sticky top-0 z-10">
            <div className="w-12 flex-shrink-0 px-2">No:</div>
            <div className="flex-1 px-2">Launched (UTC)</div>
            <div className="flex-1 px-2">Location</div>
            <div className="flex-1 px-2">Mission</div>
            <div className="flex-1 px-2">Orbit</div>
            <div className="flex-1 px-2">Launch Status</div>
            <div className="flex-1 px-2">Rocket</div> 
        </div>
    );
};

export default TableHeader;