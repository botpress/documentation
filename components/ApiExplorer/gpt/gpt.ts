import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function getCompletion(prompt: ChatCompletionRequestMessage | ChatCompletionRequestMessage[]): Promise<
  | {
      success: false
      errorContext: any
    }
  | {
      success: true
      completion: string
    }
> {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: Array.isArray(prompt) ? prompt : [prompt],
      temperature: 1,
    })
    if (completion.status === 200) {
      return {
        success: true,
        completion: completion.data.choices[0].message?.content || '',
      }
    } else
      return {
        success: false,
        errorContext: completion,
      }
  } catch (errorContext) {
    return { success: false, errorContext }
  }
}
