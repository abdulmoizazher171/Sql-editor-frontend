/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Play, Database, Save, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import plants from  './../../assets/list.json'
import Select from "react-select";

interface NavbarProps {
  onExecute: (arr: string[] ,  committed: boolean) => void;
  isExecuting: boolean;
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  save: () => void;
  committed: boolean;
  // filename: string;
  // codeRef: React.RefObject<string>;
}

export default function Navbar({
  onExecute,
  isExecuting,
  selectedSite,
  setSelectedSite,
  save,
  // filename,
  // codeRef,
  committed
}: NavbarProps) {
  // Standardized height and alignment for all interactive items
  const actionItemClass =
    "h-9 flex items-center justify-center gap-2 px-3 rounded-md text-sm font-medium transition-all border whitespace-nowrap";

  // When clicking "Execute" in React
const plantOptions = plants.map(p => ({
  value: p,
  label: p
}));





  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

const handleDropDownChange = (selected:any) => {
  setSelectedPlants(selected);
};

  const togglePlant = (plant: string) => {
    setSelectedPlants((prev) =>
      prev.includes(plant) ? prev.filter((p) => p !== plant) : [...prev, plant],
    );
  };

  const handleexecute = () => {
    
    if (selectedPlants.length === 0) return alert("Select at least one plant");

  }

  const clickHandle =()=> {
    // console.log({selectedPlants})
    onExecute(selectedPlants , committed);
   
  }


  return (
    <nav className="h-full w-full flex items-center justify-between px-4 bg-white border-b border-slate-200 text-slate-900  shadow-sm">
      {/* LEFT: Logo Section */}
      <div className="flex items-center gap-3 flex-none">
        <div className="p-1.5 bg-steel-100/50 rounded-lg border border-steel-300/50">
          <Database className="text-steel-600" size={18} />
        </div>
        <h1 className="font-bold text-base tracking-tight hidden md:block bg-gradient-to-r from-steel-600 to-amber-600 bg-clip-text text-transparent">
          AlgoAPM Studio
        </h1>
      </div>

      {/* MIDDLE: Search/Quick Open */}
      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative group">
          <Search
            size={14}
            className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-steel-600 transition-colors"
          />
          <input
            type="text"
            placeholder="Quick search procedures (Ctrl + P)"
            className="input-primary w-full py-1.5 pl-9 pr-4 text-xs"
          />
        </div>
      </div>

      {/* RIGHT: Action Toolbar */}
      <div className="flex items-center gap-2 flex-nowrap flex-none">
        {/* Server Selector */}
        <div className="flex flex-wrap gap-4 p-2 bg-slate-100/50 border-b border-slate-200 rounded-lg">
          <span className="text-xs text-slate-600 self-center font-medium">
            Target Plants:
          </span>
           <div className="w-72">
            <Select options={plantOptions} isMulti value={selectedPlants} onChange={handleDropDownChange} placeholder="Select Plants..." />
     {/* <Select
  options={plantOptions}
  isMulti
styles={{
    menu: (base) => ({
      ...base,
      zIndex: 999999999999,
      overflow: 'visible',
    })
  }}
  
/> */}
    </div>
        </div>

        {/* Save Button */}
        <button
          className="btn-secondary h-9 flex items-center justify-center gap-2 px-3 text-sm flex-none"
          onClick={() => save()}
        >
          <Save size={16} />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-slate-300 mx-1 flex-none" />

        {/* Execute Button */}
        <button
          onClick={clickHandle}
          disabled={isExecuting}
          className={`btn-primary h-9 flex items-center justify-center gap-2 px-4 text-sm flex-none ${
            isExecuting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isExecuting ? (
            <div className="w-4 h-4 border-2 border-slate-300 border-t-steel-600 rounded-full animate-spin" />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
          <span>Execute</span>
        </button>
      </div>
    </nav>
  );
}
