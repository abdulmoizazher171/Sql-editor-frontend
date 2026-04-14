/* eslint-disable @typescript-eslint/no-explicit-any */
import {   useEffect, useState } from "react";
import { ResultTable } from "./ResutlTable";
import { DatabaseLoader } from "./DatabaseLoader";

interface TabbedResultTableProps {
  results: any[][];
  success: boolean;
  error: any;
  isExecuting?: boolean;
}

export function TabbedResultTable({
  results,
  success,
  error,
  isExecuting = false,
}: TabbedResultTableProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Filter out undefined or null results
  const validResults = results.filter((result) => result !== undefined && result !== null);
  
useEffect(() => { 
    console.log(results); 
    console.log( validResults); 
} ,[] )


  const activeData = validResults[activeTab]; // ✅ IMPORTANT

  if (isExecuting) {
    return <DatabaseLoader />;
  }

  if (validResults.length === 0) {
    return (
      <div className="p-4 text-slate-600 animate-fade-in bg-slate-100/50 rounded-lg border border-slate-200">
        {error || "No results to display"}
      </div>
    );
  }
 return (
    <div className="h-full w-full flex flex-col">
      {/* Tabs */}
      <div className="flex-none bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center overflow-x-auto">
          {validResults.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2   
                 
                ${
                activeTab === index
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className={`${item?.success === false && (
                 " text-red-500 " 
              )}`}>
                {item.plant}
                </span>

              
              {item.success === false && (
                <span className="ml-2 text-red-500">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden p-2">
        {activeData.success === false ? (
          <div className="p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
            {activeData.error || "Error executing query"}
          </div>
        ) : (
          <ResultTable
            data={activeData.result}
            success={true}
            error={null}
          />
        )}
      </div>
    </div>
  );
}