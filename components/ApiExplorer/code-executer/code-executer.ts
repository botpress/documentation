import * as esbuild from 'esbuild-wasm'
import { Client } from '@botpress/client'
enum Dependencies {
  CLIENT = 'client',
  CONSOLE = 'console',
}

/**
 * Expects the code to be transpiled to the target browser to be executed sucessfully.
 * @param code
 * @returns  - console logs logs from the code execution
 */
export async function executeCode(code: string): Promise<string> {
  try {
    const BotpressClient = new Client({ host: 'http://localhost:3000' })
    const sanitizedCode = sanitizeCode(code)
    const executer = new Function(Dependencies.CLIENT, Dependencies.CONSOLE, sanitizedCode)
    const fakeConsole = {
      logs: [''],
      log: function (val: string) {
        this.logs.push(JSON.stringify(val))
      },
      error: function (val: string) {
        this.logs.push(JSON.stringify(val))
      },
      info: function (val: string) {
        this.logs.push(JSON.stringify(val))
      },
      warn: function (val: string) {
        this.logs.push(JSON.stringify(val))
      },
    }

    const result = executer(BotpressClient, fakeConsole)
    return result.join('')
  } catch (error) {
    console.error('There was an error executing the code. ', error)
    return `There was an error executing the code: ${error}`
  }
}

let esbuildWorkerInitialized = false
async function initiliaseEsbuild() {
  if (esbuildWorkerInitialized) {
    return
  }
  await esbuild.initialize({
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.18.14/esbuild.wasm',
    worker: esbuildWorkerInitialized,
  })
}
function sanitizeCode(transpiledCode: string): string {
  return `
    window=undefined;
    ${transpiledCode}\n
    return console.logs;
    `
}

// ${transpiledCode.replaceAll('console', 'console').replaceAll('window', 'undefined')}\n
// let result1 = await esbuild.transform(transpiledCode, {
//   target: 'esnext',
//   loader: 'ts',
//   platform: 'browser',
// })
// let result2 = await esbuild.build({})
// const result3 = await esbuild.build({
//   bundle: true,
//   format: 'cjs',
//   target: 'node18',
//   packages: 'external',
//   keepNames: true,
//   treeShaking: false,
//   stdin: {
//     contents: transpiledCode,
//   },
// })

// esbuildWorkerInitialized = true
// const result3Code = result3.outputFiles?.[0].text
// console.log(result1, result2, result3Code)
