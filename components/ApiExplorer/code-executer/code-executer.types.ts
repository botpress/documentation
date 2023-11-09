import { ClientProps } from '@botpress/client/dist/config'

export enum MessageTypes {
  EXECUTE = 'execute',
  EXECUTE_RESULT = 'execute-result',
  LOG = 'log',
}

export enum CodeExecuterSandboxDependencies {
  CLIENT = 'client',
  CONSOLE = 'console',
}

export type CodeExecutorMessageData =
  | {
      type: MessageTypes.EXECUTE
      code: string
      clientProps: Partial<ClientProps>
    }
  | {
      type: MessageTypes.LOG
    }
  | {
      type: MessageTypes.EXECUTE_RESULT
      result: string
    }

export type CodeExecutorMessageEvent = MessageEvent<CodeExecutorMessageData>
