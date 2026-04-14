/* eslint-disable @typescript-eslint/no-explicit-any */

// interface ResultTableProps {
//   data: any[];
// }

export function ResultTable({ data , success, error }: { data: any[]; success: boolean , error: string }) {
if (!success || !data || !Array.isArray(data) || data.length === 0) {
    return <div className="p-4 text-slate-600 animate-fade-in bg-slate-100/50 rounded-lg border border-slate-200">{error}</div>;
  }

  const columns = data[0] ? Object.keys(data[0]) : [];
  return (
    <div className="h-full w-full overflow-auto bg-white border-t border-slate-200 custom-scrollbar rounded-lg shadow-inner">
      <div className="p-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-600 font-bold uppercase tracking-widest">
              Rows Returned: {data.length}
      </div>
      <table className="w-full text-left border-collapse table-auto">
        <thead className="sticky top-0 z-20 bg-slate-100 shadow-sm">
          <tr>
            <th className="p-2 border-b border-slate-200 text-xs text-slate-600 w-12 text-center bg-slate-100 font-bold">#</th>
            {columns.map((col) => (
              <th key={col} className="p-2 border-b border-r border-slate-200 text-xs font-bold text-steel-600 uppercase bg-slate-100 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-100 transition-all duration-150 group even:bg-slate-50">
              <td className="p-2 border-r border-slate-200 text-xs text-slate-600 text-center font-mono bg-slate-100/50">
                {idx + 1}
              </td>
              {columns.map((col) => (
                <td key={col} className="p-2 border-r border-slate-200 text-xs text-slate-800 font-mono whitespace-nowrap px-4 max-w-[300px] truncate hover:text-slate-900 transition-colors">
                  {row[col] === null ? <span className="text-red-600/60 italic font-medium">NULL</span> : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}