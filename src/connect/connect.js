import { Configuration, OpenAIApi } from "openai-edge"
import { saveMessage } from "./messages"

const USE_MODEL = process.env.USE_MODEL || 'gpt-3.5-turbo'
const API_KEY = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)

const simplePrompt = async (prompt, options) => {
  const response = await openai.createChatCompletion({
    model: USE_MODEL,
    messages: [
      { role: "user", content: prompt },
    ],
    max_tokens: 100,
    temperature: 0.7,
    ...options
  }).then(response => response.json())

  saveMessage(response)
  
  return response.choices[0].message.content
}

export { simplePrompt };