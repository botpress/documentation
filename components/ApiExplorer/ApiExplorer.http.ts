import { getCompletion } from './gpt'
import { CLIENT_METHODS } from './prompts/client-context.constants'

export async function getResponseFromPrompt(query: string): Promise<string[]> {
  const prompt = `Which category of operations are best suited for this query: "${query}". Respond in a valid JSON of type {categories:string[]}\n ### CATEGORIES: ${Object.keys(
    CLIENT_METHODS
  )}`
  console.log({ query })
  console.log({ prompt1: prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return (JSON.parse(completionResponse.completion) as { categories: string[] }).categories
  } else {
    console.log({ completionFailure: completionResponse })
    return []
  }
}

export async function getResponseFromPrompt2(query: string, categories: string[]): Promise<string[]> {
  const methods = categories.reduce(
    (contextMethods, category) => contextMethods.concat(CLIENT_METHODS[category as keyof typeof CLIENT_METHODS]),
    [] as string[]
  )
  const prompt = `Which of the method(s) are best suited to respond for this query - "${query}". Respond in a valid JSON of type {methods:string[]}\n ### Methods: ${methods}`
  console.log({ prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return { methods: (JSON.parse(completionResponse.completion) as { methods: string[] })?.methods || [] }.methods
  } else {
    console.log({ completionFailure: completionResponse })
    return []
  }
}

export async function getResponseFromPrompt3(query: string, methods: string[]): Promise<string[]> {
  const prompt = `using the method(s) - ${methods} that are available on the "client" object respond with valid javascript code that answers the query "${query}". Begin with const client = new Client();`
  console.log({ prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return [completionResponse.completion]
  } else {
    console.log({ completionFailure: completionResponse })
    return ['']
  }
}

export async function executePromptChain(
  query: string,
  prompts: Array<(...args: any[]) => Promise<string[]>>
): Promise<string[]> {
  let currentArgs: [any, any] = [query, undefined]

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i]
    const response = await prompt(...currentArgs)
    currentArgs = [query, response as any]
  }

  return currentArgs[1]
}
