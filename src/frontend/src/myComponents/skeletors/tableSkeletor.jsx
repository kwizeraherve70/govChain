import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
            <th className="p-3 bg-gray-200 text-left text-sm font-medium text-gray-500"></th>
  
          </tr>
        </thead>
        <tbody>
          {/* Skeleton Row */}
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
              </td>
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
              </td>
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
              </td>
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
              </td>
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
              </td>
              <td className="p-3 bg-gray-100 text-sm h-12">
                <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;