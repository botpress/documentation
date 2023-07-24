import { CodeExecutorMessageData, CodeExecutorMessageEvent, MessageTypes } from './code-executer.types'

let hasAlreadyInitialized = false
export class CodeExecuter {
  private worker!: Worker
  constructor() {
    if (window.Worker) {
      this.worker = new Worker(new URL('./code-executer.worker', import.meta.url), { type: 'module' })
    }
  }

  public executeCode(code: string) {
    return new Promise<string>((resolve) => {
      if (hasAlreadyInitialized) {
        return 'Farts all the way down'
      }
      this.worker.onmessage = (e: CodeExecutorMessageEvent) => {
        if (e.data.type === MessageTypes.EXECUTE_RESULT) {
          resolve(e.data.result)
        }
      }
      this.worker.onerror = (e) => {
        console.log(e)
        resolve(`There was an error executing the code <B> \n${JSON.stringify(e)}}`)
      }
      this.worker.postMessage({ type: MessageTypes.EXECUTE, code } as CodeExecutorMessageData)
    })
  }
}
