import { useState, useEffect } from "react";

const SQL_SERVER_TIPS = [
  {
    title: "Use Indexes Wisely",
    tip: "CREATE INDEX on frequently searched columns to speed up queries. However, avoid over-indexing as it slows down INSERT and UPDATE operations."
  },
  {
    title: "Always Use Parameterized Queries",
    tip: "Prevent SQL injection attacks by using parameterized queries instead of concatenating strings in your SQL statements."
  },
  {
    title: "Avoid SELECT *",
    tip: "Always specify the exact columns you need. SELECT * retrieves unnecessary data and wastes bandwidth and memory."
  },
  {
    title: "Use Execution Plans",
    tip: "Use CTRL+L in SQL Server Management Studio to view execution plans and identify performance bottlenecks in your queries."
  },
  {
    title: "Batch Your Operations",
    tip: "When inserting/updating large amounts of data, use batches instead of processing one row at a time for better performance."
  },
  {
    title: "Normalize Your Database",
    tip: "Reduce data redundancy by organizing data into related tables. This improves data integrity and query performance."
  },
  {
    title: "Use UNION ALL Instead of UNION",
    tip: "If you don't need to remove duplicates, use UNION ALL which is faster than UNION as it doesn't perform a sort operation."
  },
  {
    title: "Monitor Query Performance",
    tip: "Regularly check query execution times and resource usage. Use SQL Server Profiler to identify slow queries."
  },
  {
    title: "Use Transactions Properly",
    tip: "Keep transactions short and avoid deadlocks by accessing tables in the same order and using appropriate isolation levels."
  },
  {
    title: "Archive Old Data",
    tip: "Move historical data to archive tables to keep active tables small, improving query performance significantly."
  }
];

export function DatabaseLoader() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    
      setTipIndex(Math.floor(Math.random() * SQL_SERVER_TIPS.length));
   

  }, []);

  const currentTip = SQL_SERVER_TIPS[tipIndex];
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-6">
        {/* Database Icon Animation */}
        <div className="relative w-24 h-24">
          {/* Rotating outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
          
          {/* Pulsing middle ring */}
          <div className="absolute inset-2 rounded-full border-2 border-blue-300 animate-pulse"></div>
          
          {/* Database cylinder center */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="relative w-12 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg">
              {/* Cylinder top */}
              <div className="absolute -top-1 left-0 right-0 h-3 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full"></div>
              
              {/* Data lines animation */}
              <div className="absolute inset-2 flex flex-col justify-around">
                <div className="h-0.5 bg-white opacity-0 animate-[pulseWidth_1.5s_ease-in-out_infinite]"></div>
                <div className="h-0.5 bg-white opacity-60 animate-[pulseWidth_1.5s_ease-in-out_0.5s_infinite]"></div>
                <div className="h-0.5 bg-white opacity-0 animate-[pulseWidth_1.5s_ease-in-out_1s_infinite]"></div>
              </div>
            </div>
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-cyan-400 rounded-full"/>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-cyan-400 rounded-full"/>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-cyan-400 rounded-full"/>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-slate-700 font-semibold text-lg">Executing Query</p>
          <p className="text-slate-500 text-sm mt-1">Fetching data from database...</p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* SQL Server Tip */}
        <div className="w-96 max-w-md mt-4 p-4 bg-white rounded-lg border border-slate-200 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-amber-500 text-xl">💡</div>
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-sm mb-1">{currentTip.title}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{currentTip.tip}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseWidth {
          0%, 100% { width: 0%; opacity: 0; }
          50% { width: 100%; opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
