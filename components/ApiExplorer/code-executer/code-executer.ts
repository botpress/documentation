/**
 * Expects the code to be transpiled to the target browser to be executed sucessfully.
 * @param transpiledCode
 * @returns  - console logs logs from the code execution
 */
export function executeCode(transpiledCode: string): string {
  try {
    const code = sanitizeCode(transpiledCode)
    return new Function(code)() as string
  } catch (error) {
    console.error('There was an error executing the code. ', error)
    return `There was an error executing the code: ${error}`
  }
}

function sanitizeCode(transpiledCode: string): string {
  return `
    window=undefined;
    let logs = '';
    const fakeConsole = {
      log: (val) => {
        logs += val+'\\n';
      },
      error: (val) => {
        logs += val+'\\n';
      },
      info: (val) => {
        logs += val+'\\n';
      },
      warn: (val) => {
        logs += val+'\\n';
      },
    };
    ${transpiledCode.replaceAll('console', 'fakeConsole').replaceAll('window', 'undefined')}\n

    return logs
  `
}
