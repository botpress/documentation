import { ClientProps } from '@botpress/client/dist/config'
import { CodeExecutorMessageData, CodeExecutorMessageEvent, MessageTypes } from './code-executer.types'

export class CodeExecuter {
  private worker!: Worker
  constructor() {
    if (window.Worker) {
      this.worker = new Worker(new URL('./code-executer.worker', import.meta.url), { type: 'module' })
    }
  }

  /**
   * sends and receives message from the worker to execute the `code`
   */
  public executeCode(code: string) {
    return new Promise<string>((resolve) => {
      this.worker.onmessage = (e: CodeExecutorMessageEvent) => {
        if (e.data.type === MessageTypes.EXECUTE_RESULT) {
          resolve(e.data.result)
        }
      }
      this.worker.onerror = (e) => {
        console.log(e)
        resolve(`There was an error executing the code <B> \n${JSON.stringify(e)}}`)
      }

      const clientConfig = JSON.parse(localStorage.getItem(CLIENT_PROPS_KEY) ?? '{}')

      this.worker.postMessage({
        type: MessageTypes.EXECUTE,
        code,
        clientProps: clientConfig,
      } as CodeExecutorMessageData)
    })
  }
}

export const CLIENT_PROPS_KEY = 'clientProps'
export function getClientCodeBlock(clientProps: Partial<ClientProps>) {
  return `const client = new Client(${JSON.stringify(clientProps)})\n`
}
