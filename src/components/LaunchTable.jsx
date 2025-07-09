import { memo } from "react";
import { FixedSizeList as List } from 'react-window'
import TableHeader from "@/components/TableHeader";
import TableRow from "@/components/TableRow";
import { useTableContext } from "@/hooks/useTableContext";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import LaunchCard from '@/components/LaunchCard';

const LaunchTable = () => {

    const { launches, loading, error, openLaunch } = useTableContext();
    
    if (loading && launches.length === 0) {
        return (
            <div className="w-full px-4 md:px-16">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <TableHeader />
                <Loader />
            </div>
            </div>
        );
    }

    if (error && launches?.length === 0) {
        return (
            <div className="w-full px-4 md:px-16">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <TableHeader />
                <div className="flex justify-center items-center h-40 text-red-500 text-sm">
                    Error loading data: {error}
                </div>
            </div>
            </div>
        );
    }
     if (!loading && launches?.length === 0) {
        return (
            <div className="w-full px-4 md:px-16">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <TableHeader />
                <div className="flex justify-center items-center h-40 text-gray-500 text-sm">
                    No results found for the specified filter
                </div>
            </div>
            </div>
        );
    }

    if (loading && launches.length > 0){  
        return (
            <div className="w-full px-4 md:px-16">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">

                <TableHeader />
                <Loader />
            </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 md:px-16">
            {/* Desktop table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hidden md:block">
                <TableHeader />
                <div className="relative">
                    <List
                        height={400}
                        itemCount={launches.length}
                        itemSize={48}
                        width="100%"
                    >
                        {({ index, style }) => (
                            <div style={style}>
                                <TableRow item={launches[index]} />
                            </div>
                        )}
                    </List>
                </div>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 md:hidden max-w-full mx-auto px-2 overflow-x-hidden">
                {launches.map((l) => (
                    <LaunchCard key={l.no} launch={l} onPress={openLaunch} />
                ))}
            </div>

            <Pagination />
        </div>
    );
};

export default memo(LaunchTable);