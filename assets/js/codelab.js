/**
 * assets/js/codelab.js - Python Code Execution Service Helper
 */

window.CodeLabEngine = {
  execute: async function(code) {
    if (window.pyodideInstance) {
      try {
        const result = await window.pyodideInstance.runPythonAsync(code);
        return { stdout: String(result), stderr: '', success: true };
      } catch (err) {
        return { stdout: '', stderr: String(err), success: false };
      }
    }
    return { stdout: 'CodeLab client initialized.', stderr: '', success: true };
  }
};
