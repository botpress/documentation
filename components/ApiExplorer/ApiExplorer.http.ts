import { getCompletion } from './gpt'
import { CLIENT_METHODS } from './prompts/client-context.constants'

export async function getResponseFromPromptChain(query: string) {
  try {
    const prompt1 = `Which category of operations are best suited for this query: "${query}". Respond in a valid JSON of type {categories:string[]}\n ### CATEGORIES: ${Object.keys(
      CLIENT_METHODS
    )}`
    console.log({ query })
    console.log({ prompt1 })
    const completionResponse = await getCompletion(prompt1)
    if (completionResponse.success) {
      console.log({ completion1: completionResponse.completion })
      const values = JSON.parse(completionResponse.completion) as { categories: string[] }
      const methods = values.categories.reduce(
        (contextMethods, category) => contextMethods.concat(CLIENT_METHODS[category as keyof typeof CLIENT_METHODS]),
        [] as string[]
      )
      const prompt2 = `Which of the method(s) are best suited to respond for this query - "${query}". Respond in a valid JSON of type {methods:string[]}\n ### Methods: ${methods}`
      console.log({ prompt2 })
      const completionResponse2 = await getCompletion(prompt2)
      if (completionResponse2.success) {
        console.log({ completion2: completionResponse2.completion })
        const selectedMethods = (JSON.parse(completionResponse2.completion) as { methods: string[] })?.methods || []
        const prompt3 = `using the method(s) - ${selectedMethods} that are available on the "client" object respond with valid javascript code that answers the query "${query}". Begin with const client = new Client();`
        console.log({ prompt3 })
        const completionResponse3 = await getCompletion(prompt3)
        if (completionResponse3.success) {
          console.log({ completion3: completionResponse3.completion })
          return completionResponse3.completion
        } else {
          console.log({ completion3Failure: completionResponse3 })
          return ''
        }
      } else {
        console.log({ completion2Failure: completionResponse2 })
        return ''
      }
    } else {
      console.log({ completionFailure: completionResponse })
      return ''
    }
  } catch (error) {
    console.log('There was a problem generating the response', { error })
    return ''
  }
}
