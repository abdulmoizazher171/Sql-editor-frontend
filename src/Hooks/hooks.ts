/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */



const BASEURL = import.meta.env.VITE_API_URL;
console.log("All Env Variables:", import.meta.env);
 

const validateQuery = (query:any) => {
  const normalizedQuery = query.toLowerCase().trim();

  // ❌ Skip validation if it's a procedure/function definition
  if (
    normalizedQuery.includes('create procedure') ||
    normalizedQuery.includes('alter procedure') ||
    normalizedQuery.includes('create proc') ||
    normalizedQuery.includes('alter proc') ||
    normalizedQuery.includes('create function') ||
    normalizedQuery.includes('alter function')
  ) {
    return { success: true };
  }

  // ✅ Check if it's a SELECT query without TOP
  const isSelect = /^\s*select\b/.test(normalizedQuery);
  const hasTop = /\bselect\s+top\s+\d+/i.test(query);

  if (isSelect && !hasTop) {
    alert("⚠️ Please use TOP in SELECT queries to limit results (e.g., SELECT TOP 100 ...)");
    return { success: false, error: "Missing TOP in SELECT query" };
  }

  // ⚠️ Optional: wildcard warning
  if (normalizedQuery.includes('*')) {
    alert("⚠️ Warning: Using '*' may impact performance. Consider selecting specific columns.");
  }

  return { success: true };
};



const fetchScripts = async () => {
  try {
    console.log("All Env Variables:", import.meta.env);
    const response = await fetch(`${BASEURL}/api/scripts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return [];
  }
};

const fetchScript = async (filename: string) => {
  try {
    const response = await fetch(
      `${BASEURL}/api/scripts/${filename}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching script:", error);
    return null;
  }
};

const handleExecute = async (query: string, site: string , committed: boolean): Promise<any> => {
  const response = await fetch(`${BASEURL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      site: site, 
    }),
  });
 
//  const out= validateQuery(query.toLowerCase());
//  if(out.success === false) {
//       return { success: false, error: "Query contains potentially harmful keywords" };
//  }
 
  if (query.toLowerCase().includes('procedure') || query.toLowerCase().includes('function') || query.toLowerCase().includes('proc') ) 
  {
    if (!committed) {
      alert("⚠️ Warning: Your query contains keywords that may modify database objects. Please commit this before execution.");
      return { success: false, error: "Query contains potentially harmful keywords" };
    }
  }


  const result = await response.json();
  console.log("Raw response from backend:", result);
  if (result.success) {
    // Pass result.data (the array) to your state
    return result.data;
  } else {
    
    return { success: false, error: result.error,plant:result.plant };
  }
};

const handleGitCommit = async (filename: string, codeRef: React.RefObject<string>) => {

  
    const currentContent = codeRef.current; 
  
  try {
    // 2. SAVE: Write the editor content to the actual file on D: drive
    const saveRes = await fetch(`${BASEURL}/api/git/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: filename, content: currentContent })
    });
  

  const saveData = await saveRes.json();
    if (!saveData.success) throw new Error("Could not save file to disk");
}

    catch (error: any) {
    return
  }

  
  
  if (!filename) return alert("Select a file first");

  const branch = prompt("Enter Branch Name:", "main");
  if (!branch) return;

  const message = prompt("Enter Commit Message:");
  if (!message) return;

  try {
    const response = await fetch(`${BASEURL}/api/git/commit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, branch, filename }),
    });

    const result = await response.json();
    if (result.success) {
  
     // Mark as committed after successful commit
    } 
  } catch (error) {
    console.log("Git commit failed:", error);
  }
};




const handlemultipleexecute = async (query: string, sites: string[]): Promise<any> => {
  const response = await fetch(`${BASEURL}/api/query/multi-plant-query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      sites: sites
    }),
  });
  const results = await response.json();
  // results will now be an array of objects: { plant: 'GEL', data: [...] }
  return results;
};
  



export { fetchScripts, fetchScript, handleExecute, handleGitCommit, handlemultipleexecute };
