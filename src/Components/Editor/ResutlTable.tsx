
// interface ResultTableProps {
//   data: any[];
// }

export function ResultTable({ data , success, error }: { data: any[]; success: boolean , error: string }) {
if (!success || !data || !Array.isArray(data) || data.length === 0) {
    return <div className="p-4 text-gray-500">{error}</div>;
  }

  // 2. Only execute this AFTER we are 100% sure data[0] exists
  const columns = data[0] ? Object.keys(data[0]) : [];
  return (
    /* 1. Parent must have h-full and overflow-auto to enable scrolling */
    <div className="h-full w-full overflow-auto bg-[#0f0f0f] border-t border-gray-800 custom-scrollbar">
      <div className="p-2 bg-[#181818] border-b border-gray-800 text-[10px] text-gray-500 font-bold uppercase">
              Rows Returned: {data.length}
            </div>
      <table className="w-full text-left border-collapse table-auto">
        <thead className="sticky top-0 z-20 bg-[#181818] shadow-md">
          <tr>
            <th className="p-2 border-b border-gray-800 text-[10px] text-gray-500 w-12 text-center bg-[#181818]">#</th>
            {columns.map((col) => (
              <th key={col} className="p-2 border-b border-r border-gray-800 text-[11px] font-bold text-blue-400 uppercase bg-[#181818] whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#1e1e1e] transition-colors group">
              <td className="p-2 border-r border-gray-800 text-[10px] text-gray-600 text-center font-mono bg-[#141414]">
                {idx + 1}
              </td>
              {columns.map((col) => (
                <td key={col} className="p-2 border-r border-gray-800 text-xs text-gray-300 font-mono whitespace-nowrap px-4 max-w-[300px] truncate">
                  {row[col] === null ? <span className="text-red-900/50 italic">NULL</span> : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}