import { useEffect, useState } from 'react';
import { Search, FileCode, Database, Activity } from 'lucide-react';
import {  fetchScripts } from '../../Hooks/hooks';
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
    <div className="w-64 h-full bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center gap-2 font-semibold text-slate-900 bg-gradient-to-r from-slate-50 to-slate-100">
        <Activity size={18} className="text-steel-600" />
        <span className="text-sm tracking-tight">Object Explorer</span>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative group flex items-center flex-col">
          <div className="absolute left-3 flex self-end pointer-events-none z-10">
            <Search 
              className="text-slate-400 group-focus-within:text-steel-600 transition-colors" 
              size={14} 
            />
          </div>
          <input
            type="text"
            placeholder="Search procedures..."
            autoComplete="off"
            className="input-primary block w-full h-9 pl-10 pr-3 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <Database size={12} className="text-steel-600" />
            Stored Procedures
          </div>
          
          {/* Handle Empty State */}
          {filteredProcedures.length === 0 ? (
            <div className="px-4 py-3 text-xs text-slate-500 italic animate-fade-in">
              No procedures found...
            </div>
          ) : (
            filteredProcedures.map((proc) => (
              <button
                key={proc.id}
                onClick={() => onSelect(proc.name)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all group text-left mb-0.5 border border-transparent hover:border-slate-300"
              >
                <FileCode size={16} className="text-slate-500 group-hover:text-steel-600 transition-colors" />
                <span className="truncate">{proc.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 text-xs text-slate-600 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
          <span>Connected: <span className="text-slate-900 font-medium">AlgoAPM_Prod</span></span>
        </div>
      </div>
    </div>
  );
}