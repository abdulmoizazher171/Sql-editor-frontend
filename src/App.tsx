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
import { ResultTable } from "./Components/Editor/ResutlTable";

export default function App() {
  const [currentCode, setCurrentCode] = useState(
    "-- Select a procedure to edit or start typing...",
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
  const [error, setError] = useState("");

  const handleExecuteQuery = async (arr: string[] , committed: boolean) => {
    console.log({ arr });
    setIsExecuting(true);
    try {
      const codeToRun = codeRef.current;
      if (arr.length == 1) {
        const response = await handleExecute(codeToRun, arr[0], committed);
        console.log(response);
        setQueryResult(response);
        setQuerySuccess(true);
      } else {
        const response = await handlemultipleexecute(codeToRun, arr);
        console.log(response);
        for (const site in response) {
          console.log(`Results for ${site}:`, response[site]);
        }
        setQueryResult([]);
        setQuerySuccess(true);
      }

      // console.log(response);
      // if (response) {
      //   setQueryResult(response);
      //   setQuerySuccess(true);
      // } else {
      //   setQuerySuccess(false);
      //   alert("SQL Error: " + response.error);

      // }
    } catch (error) {
      console.error("Execution failed", error);
      setQuerySuccess(false);
      setError(error instanceof Error ? error.message : "Unknown error");
      alert("Execution failed: " + (error instanceof Error ? error.message : "Unknown error"));
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
    // h-screen + overflow-hidden prevents the whole page from scrolling
    <div className="flex flex-col h-screen w-screen bg-[#0f0f0f] text-gray-200 overflow-hidden">
      {/* 1. Top Navigation (Fixed Height) */}
      <div className="h-14 w-full flex-none">
        <Navbar
          onExecute={handleExecuteQuery }
          isExecuting={isExecuting}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          save={commithandler}
          committed={committed}
          // filename={filename}
          // codeRef={codeRef}
        />
      </div>

      {/* 2. Main Workspace (Flexible Height) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar (Fixed Width) */}
        <aside className="w-64 flex-none border-r border-gray-800 bg-[#181818]">
          <ProcedureSidebar onSelect={loadProcedure} />
        </aside>

        {/* Editor & Console Area (Flexible Width) */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Editor Container (Grows to fill space) */}
          <div className="h-1/2 relative overflow-hidden">
            <SqlEditor
              code={currentCode}
              onChange={(val) => {
                codeRef.current = val || ""; // Update the ref (zero re-renders!)
              }}
            />
          </div>
          <div className="h-1/2 flex flex-col bg-[#0f0f0f]">
            

            {/* This wrapper ensures the table fills the 50% height and scrolls */}
            <div className="flex-1 relative overflow-hidden">
              {selectedSite.length > 1 ? (
                <div className="p-4 text-gray-500">
                  Multiple sites selected. Please check the console for
                  individual results.
                </div>
              ) : (
                <ResultTable data={queryResult} success={querySuccess} error={error} />
              )}
              <ResultTable data={queryResult} success={querySuccess} error={error} />
            </div>
          </div>

          {/* 3. Bottom Console (Fixed Height, can be made resizable later) */}
          <div className="h-40 flex-none border-t border-gray-800 bg-[#121212] flex flex-col">
            <div className="flex items-center px-4 py-1.5 bg-[#181818] border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Output / Execution Logs
            </div>
            <div className="flex-1 p-4 font-mono text-[12px] overflow-y-auto custom-scrollbar">
              <div className="flex gap-3 mb-1">
                <span className="text-gray-600">[10:45:01]</span>
                <span className="text-blue-400 font-bold">INFO:</span>
                <span>Editor initialized. Ready for AlgoAPM queries.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-gray-600">[10:45:05]</span>
                <span className="text-green-500 font-bold">SUCCESS:</span>
                <span>Connection established to MWPL (192.168.1.10)</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 4. Thin Status Bar (Optional Pro Detail) */}
      <footer className="h-6 flex-none bg-blue-600 flex items-center px-3 justify-between text-[11px] text-white">
        <div className="flex gap-4">
          <span>Ready</span>
          <span>Ln 1, Col 1</span>
        </div>
        <div className="font-mono">UTF-8</div>
      </footer>
    </div>
  );
}
