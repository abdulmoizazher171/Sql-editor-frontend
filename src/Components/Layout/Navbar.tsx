import { Play, Database, Save, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

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

  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const plants = ["GEL", "MWPL", "TGL", "Foundation"]; // Your plant list

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
    <nav className="h-full w-full flex items-center justify-between px-4 bg-[#181818] border-b border-gray-800 text-gray-200 overflow-hidden">
      {/* LEFT: Logo Section (Fixed width, won't shrink) */}
      <div className="flex items-center gap-3 flex-none">
        <div className="p-1.5 bg-blue-600/10 rounded-lg">
          <Database className="text-blue-500" size={18} />
        </div>
        <h1 className="font-bold text-sm tracking-tight hidden md:block">
          AlgoAPM Studio
        </h1>
      </div>

      {/* MIDDLE: Search/Quick Open (Optional but fills space professionally) */}
      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative group">
          <Search
            size={14}
            className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-blue-400"
          />
          <input
            type="text"
            placeholder="Quick search procedures (Ctrl + P)"
            className="w-full bg-[#252525] border border-gray-700 rounded-md py-1.5 pl-9 pr-4 text-xs outline-none focus:border-gray-500 transition-all"
          />
        </div>
      </div>

      {/* RIGHT: Action Toolbar (Forced to stay in one row) */}
      <div className="flex items-center gap-2 flex-nowrap flex-none">
        {/* Server Selector */}
        <div className="flex flex-wrap gap-4 p-2 bg-[#181818] border-b border-gray-800">
          <span className="text-xs text-gray-500 self-center">
            Target Plants:
          </span>
          {plants.map((plant) => (
            <label
              key={plant}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedPlants.includes(plant)}
                onChange={() => togglePlant(plant)}
                className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-0"
              />
              <span
                className={`text-xs ${selectedPlants.includes(plant) ? "text-blue-400" : "text-gray-500"} group-hover:text-gray-300`}
              >
                {plant}
              </span>
            </label>
          ))}
        </div>

        {/* Save Button */}
        <button
          className={`${actionItemClass} bg-white border-gray-700 hover:bg-[#323232] text-gray-300 flex-none`}
          onClick={() => save()}
        >
          <Save size={16} />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-gray-700 mx-1 flex-none" />

        {/* Execute Button */}
        <button
          onClick={clickHandle}
          disabled={isExecuting}
          className={`${actionItemClass} bg-blue-600 border-blue-500 hover:bg-blue-400 text-white shadow-lg active:scale-95 flex-none`}
        >
          <Play size={14} fill="currentColor" />
          <span>Execute</span>
        </button>
      </div>
    </nav>
  );
}
