import { CLIENT_METHODS } from './prompts.constants'

export function getPromptWithContext1(message: string) {
  return `${message}. Respond in a valid JSON of type {categories:string[]}\n ### CATEGORIES: ${Object.keys(
    CLIENT_METHODS
  )}`
}
