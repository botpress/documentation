export class FailureResponse<T = any> {
  reason?: string
  context?: T

  constructor(reason?: string, context?: T) {
    this.reason = reason
    this.context = context
  }

  getHumanizedErrorMessage(): string {
    return `${this.reason || 'There was an error processing the request'}`
  }
}

export type WithFailureResponse<T, U = any> = T | FailureResponse<U>
