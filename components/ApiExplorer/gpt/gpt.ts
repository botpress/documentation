import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function getCompletion(prompt: string): Promise<
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
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
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
