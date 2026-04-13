import { useEffect, useState } from 'react';
import { Search, FileCode, Database, Activity } from 'lucide-react';
import { fetchScript, fetchScripts } from '../../Hooks/hooks';
interface Procedure {
  id: string;
  name: string;
  lastModified: string;
}

const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'SP_GetTurbineStatus', lastModified: '2026-04-01' },
  { id: '2', name: 'SP_AvailabilityReport', lastModified: '2026-03-28' },
  { id: '3', name: 'SP_Selector', lastModified: '2026-04-05' },
  { id: '4', name: 'SP_InsertLogData', lastModified: '2026-02-15' },
];

interface SidebarProps {
  onSelect: (name: string) => void;
}





export  function ProcedureSidebar({ onSelect }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');


const [procedures, setProcedures] = useState<Procedure[]>(MOCK_PROCEDURES);

useEffect(() => {
  const loadProcedures = async () => {
    const procs = await fetchScripts();
    // If procs is an array and has items, update state
    if (Array.isArray(procs) && procs.length > 0) {
      setProcedures(procs);
    }
  };
  loadProcedures();
}, []);




  // Added trim() to ensure accidental spaces don't break search
  const filteredProcedures = procedures.filter(proc =>
    proc.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="w-64 h-full bg-[#181818] border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-2 font-semibold text-gray-100">
        <Activity size={18} className="text-blue-500" />
        <span className="text-sm tracking-tight">Object Explorer</span>
      </div>

      {/* Search Bar - FIXED COLORS FOR READABILITY */}
   {/* Search Bar Container */}
<div className="p-3">
  {/* Single Relative Wrapper */}
  <div className="relative group flex items-center  justify-content flex-col">
    
    {/* 1. The Icon: Fixed to the LEFT to match the pl-10 on the input */}
    <div className="absolute left-3 flex self-end pointer-events-none z-10">
      <Search 
        className="text-gray-500 group-focus-within:text-blue-400 transition-colors" 
        size={14} 
      />
    </div>
    
    {/* 2. The Input: Single class string, no nested divs */}
    <input
      type="text"
      placeholder="Search procedures..."
      autoComplete="off"
      className="block w-full h-9 bg-[#2a2a2a] border border-gray-700 rounded-md pl-10 pr-3 text-xs !text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    
  </div>
</div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#181818]">
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 px-2 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Database size={12} />
            Stored Procedures
          </div>
          
          {/* Handle Empty State */}
          {filteredProcedures.length === 0 ? (
            <div className="px-4 py-3 text-xs text-gray-600 italic">
              No procedures found...
            </div>
          ) : (
            filteredProcedures.map((proc) => (
              <button
                key={proc.id}
                onClick={() => onSelect(proc.name)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-all group text-left mb-0.5"
              >
                <FileCode size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                <span className="truncate">{proc.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 text-[10px] text-gray-500 border-t border-gray-800 bg-[#141414]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Connected: <span className="text-gray-300">AlgoAPM_Prod</span></span>
        </div>
      </div>
    </div>
  );
}