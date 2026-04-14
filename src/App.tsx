/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";

import { ProcedureSidebar } from "./Components/Sidebar/Sidebar";
import { SqlEditor } from "./Components/Editor/SqlEditor";
import Navbar from "./Components/Layout/Navbar";
import {
  fetchScript,
  handleExecute,
  handleGitCommit,
  handlemultipleexecute,
} from "./Hooks/hooks";
import { TabbedResultTable } from "./Components/Editor/TabbedResultTable";

export default function App() {
  const [currentCode, setCurrentCode] = useState("",
  );
  const [procedure, setProcedure] = useState<Procedure>({
    content: "",
  } as Procedure);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  interface Procedure {
    content: string;
  }

  const codeRef = useRef(currentCode);
  const [filename, setFilename] = useState("untitled.sql");

  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedSite, setSelectedSite] = useState("MWPL");
  const [querySuccess, setQuerySuccess] = useState(true);
  const [committed, setCommitted] = useState(false);
  const [error, setError] = useState<any>();

const handleExecuteQuery = async (arr: any, committed: boolean) => {
  setIsExecuting(true);

  try {
    const codeToRun = codeRef.current;

    const responses = await Promise.all(
      arr.map((item: any) =>
        handleExecute(codeToRun, item.value, committed)
      )
    );

    console.log(responses);
    setQueryResult(responses);
    setQuerySuccess(true);

  } catch (error) {
    console.error("Execution failed", error);
    setQuerySuccess(false);
    setError(error)
    console.error("Error executing query:", error);
    console.error("Error executing query:", error);
  } finally {
    setIsExecuting(false);
  }
};

  const loadProcedure = async (name: string) => {
    try {
      setFilename(name + ".sql"); // Update filename in state for Navbar display and saving
      // 1. Fetch the actual data
      const proc: Procedure = await fetchScript(name);

      // 2. Check the data directly from the variable 'proc'
      // Note: 'proc.content' usually isn't a promise, so you don't need 'await' there
      if (proc && proc.content != null) {
        // Update state for the rest of the UI
        setProcedure(proc);

        // 3. CRITICAL: Use 'proc.content' directly to update the editor
        setCurrentCode(proc.content);
      } else {
        const errorMsg =
          "-- Failed to load procedure content. Please try again.";
        setProcedure({ content: errorMsg });
        setCurrentCode(errorMsg);
      }
    } catch (error) {
      const errorMsg = "-- Network error: Could not connect to backend.";
      setCurrentCode(errorMsg);
    }
  };
  const commithandler = () => {
    setCommitted(true);
    handleGitCommit(filename, codeRef);
    
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-white text-slate-900 overflow-hidden">
      {/* 1. Top Navigation (Fixed Height) */}
      <div className="h-14 w-full flex-none">
        <Navbar
          onExecute={handleExecuteQuery }
          isExecuting={isExecuting}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          save={commithandler}
          committed={committed}
        />
      </div>

      {/* 2. Main Workspace (Flexible Height) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar (Fixed Width) */}
        <aside className="w-64 flex-none border-r border-slate-200 bg-slate-50 shadow-sm">
          <ProcedureSidebar onSelect={loadProcedure} />
        </aside>

        {/* Editor & Console Area (Flexible Width) */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-100">
          {/* Editor Container (Grows to fill space) */}
          <div className="h-1/2 relative overflow-hidden border-b border-slate-200">
            <SqlEditor
              code={currentCode}
              onChange={(val) => {
                codeRef.current = val || "";
              }}
            />
          </div>
          <div className="h-1/2 flex flex-col bg-white">
            {/* This wrapper ensures the table fills the 50% height and scrolls */}
            <div className="flex-1 relative overflow-hidden">
              <TabbedResultTable
                results={queryResult}
                success={querySuccess}
                error={error}
                isExecuting={isExecuting}
              />
            </div>
          </div>

          {/* 3. Bottom Console (Fixed Height) */}
          <div className="h-40 flex-none border-t border-slate-200 bg-slate-50 flex flex-col shadow-inner">
            <div className="flex items-center px-4 py-1.5 bg-white border-b border-slate-200 text-xs uppercase tracking-widest text-slate-600 font-bold">
              Output / Execution Logs
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
              <div className="flex gap-3 mb-1">
                <span className="text-slate-500">[10:45:01]</span>
                <span className="text-steel-600 font-bold">INFO:</span>
                <span className="text-slate-700">Editor initialized. Ready for AlgoAPM queries.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500">[10:45:05]</span>
                <span className="text-green-600 font-bold">SUCCESS:</span>
                <span className="text-slate-700">Connection established to MWPL (192.168.1.10)</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 4. Status Bar */}
      <footer className="h-6 flex-none bg-steel-600 border-t border-slate-200 flex items-center px-3 justify-between text-xs text-white shadow-md">
        <div className="flex gap-6">
          <span className="text-green-300 font-medium">● Ready</span>
          <span>Ln 1, Col 1</span>
        </div>
        <div className="font-mono">UTF-8</div>
      </footer>
    </div>
  );
}
