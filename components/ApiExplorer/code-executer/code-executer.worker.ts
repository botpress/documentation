import { Client } from '@botpress/client'
import { CodeExecuterSandboxDependencies, CodeExecutorMessageEvent, MessageTypes } from './code-executer.types'

/**
 * Expects the code to be transpiled to the target browser to be executed sucessfully.
 * @param code
 * @returns  - console logs logs from the code execution
 */
async function executeCode(code: string): Promise<string> {
  try {
    const BotpressClient = new Client({
      // TODO: insert fields from the user's botpress instance
    })
    const sanitizedCode = sanitizeCode(code)
    const AsyncFunction = async function () {}.constructor
    const executer = AsyncFunction(
      CodeExecuterSandboxDependencies.CLIENT,
      CodeExecuterSandboxDependencies.CONSOLE,
      sanitizedCode
    )
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

    const result = await executer(BotpressClient, fakeConsole)
    return Array.isArray(result) ? result.join('\n') : result
  } catch (error) {
    console.error('There was an error executing the code. ', error)
    return `There was an error executing the code <A> \n${error}`
  }
}

function sanitizeCode(transpiledCode: string): string {
  const sanitized = transpiledCode
  return `
    ${sanitized}\n
    console.log(client.listConversations)
    return console.logs;
    `
}

onmessage = async (event: CodeExecutorMessageEvent) => {
  if (event.data.type === MessageTypes.EXECUTE) {
    const result = await executeCode(event.data.code)
    postMessage({ type: MessageTypes.EXECUTE_RESULT, result })
  }
}
