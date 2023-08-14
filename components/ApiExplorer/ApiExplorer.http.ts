import { FailureResponse, WithFailureResponse } from 'types/error'
import { getCompletion } from './gpt'
import { CLIENT_METHODS } from './prompts/client-context.constants'

export async function getResponseFromPrompt(query: string): Promise<WithFailureResponse<string[]>> {
  const prompt = `Which category of operations are best suited for this query: "${query}". Respond in a valid JSON of type {categories:string[]}\n ### CATEGORIES: ${Object.keys(
    CLIENT_METHODS
  )}`
  const completionResponse = await getCompletion({ role: 'user', content: prompt })
  if (completionResponse.success) {
    return (JSON.parse(completionResponse.completion) as { categories: string[] }).categories
  } else {
    return new FailureResponse('There was an error processing the prompt', completionResponse.errorContext)
  }
}

export async function getResponseFromPrompt1(
  query: string,
  categories: string[]
): Promise<WithFailureResponse<string[]>> {
  const methodNames = categories.reduce(
    (contextMethods, category) => contextMethods.concat(CLIENT_METHODS[category as keyof typeof CLIENT_METHODS]),
    [] as string[]
  )

  const props = { blockName: '', processedDependencies: [], content: '' }
  for (const methodName of methodNames) {
    props.blockName = methodName
    await processFileContent(props)
  }
  const prompt = `Which of the method(s) are best suited to respond for this query - "${query}". Respond in a valid JSON of type {methods:string[]}\n`
  const completionResponse = await getCompletion([
    { role: 'system', content: props.content },
    { role: 'user', content: prompt },
  ])
  if (completionResponse.success) {
    return { methods: (JSON.parse(completionResponse.completion) as { methods: string[] })?.methods || [] }.methods
  } else {
    return new FailureResponse('There was an error processing the prompt', completionResponse.errorContext)
  }
}

export async function getResponseFromPrompt2(query: string, methods: string[]): Promise<WithFailureResponse<string[]>> {
  const props = { blockName: '', processedDependencies: [], content: '' }
  for (const method of methods) {
    props.blockName = method
    await processFileContent(props)
  }

  const prompt = `Using the provided types, write valid javascript code that answers the following query - "${query}". All the methods are async and are available on an object called client. In the end call the functions you create with await and log the result. Do not explain your code`
  const completionResponse = await getCompletion([
    { role: 'system', content: props.content },
    { role: 'system', content: prompt },
  ])
  if (completionResponse.success) {
    return [completionResponse.completion.replaceAll('```javascript', '').replaceAll('```', '')]
  } else {
    return new FailureResponse('There was an error processing the prompt', completionResponse.errorContext)
  }
}

async function processFileContent(props: { blockName: string; processedDependencies: string[]; content: string }) {
  const fileName = props.blockName + '.ts'
  const fileContent = await fetch(`https://cdn.botpress.dev/api/types/v1/${fileName}`).then((res) => res.text())
  const { dependencyFileNames, contentWithoutImports } = getContentWithoutImportsOrExports(fileContent)
  props.processedDependencies.push(props.blockName)

  props.content += contentWithoutImports + '\n'
  for (const dependency of dependencyFileNames) {
    if (props.processedDependencies.includes(dependency)) {
      continue
    }
    props.blockName = dependency
    await processFileContent(props)
  }
}

function getContentWithoutImportsOrExports(content: string): {
  dependencyFileNames: string[]
  contentWithoutImports: string
} {
  const dependencyFileNames: string[] = []
  let contentWithoutImports: string = ''
  for (const line of content.split('\n')) {
    if (line.startsWith('import')) {
      const dependencyFileName = line.split('from')[1].split("'")[1].replace('./', '')
      dependencyFileNames.push(dependencyFileName)
    } else {
      contentWithoutImports += line.replaceAll('export', '') + '\n'
    }
  }
  return { dependencyFileNames, contentWithoutImports }
}

export async function executePromptChain(
  query: string,
  prompts: Array<(...args: any[]) => Promise<WithFailureResponse<string[]>>>
): Promise<WithFailureResponse<string[]>> {
  let currentArgs: [any, any] = [query, undefined]
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i]
    const response = await prompt(...currentArgs)
    if (response instanceof FailureResponse) {
      return response
    }
    currentArgs = [query, response as any]
  }

  return currentArgs[1]
}
