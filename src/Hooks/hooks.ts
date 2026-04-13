


const BASEURL = import.meta.env.VITE_API_URL;
console.log("All Env Variables:", import.meta.env);
 
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
      site: site, // e.g., "MWPL" or "GEL"
    }),
  });
  if (query.includes('*'))
  {
    alert("⚠️ Warning: Your query contains a wildcard (*). This may lead to long execution times or large result sets. Please ensure this is intentional.");
    return { success: false, error: "Query contains wildcard (*)" };
  }

  if (query.includes('procedure') || query.includes('function') || query.includes('view') || query.includes('Procedure') || query.includes('Function') || query.includes('View'))
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
    alert("❌ Error: " + result.error);
    return { success: false, error: result.error };
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
    alert(error.message);
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
      alert("✅ " + result.message);
     // Mark as committed after successful commit
    } else {
      alert("❌ Git Error: " + result.error);
    }
  } catch (error) {
    alert("System Error: Could not connect to Git service.");
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
