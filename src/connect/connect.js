import { Configuration, OpenAIApi } from "openai"
import { saveMessage } from "./messages.js"

import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)

const defaultOptions = {
  max_tokens: 100,
  temperature: 0.7,
  model: process.env.USE_MODEL || 'gpt-3.5-turbo',
}

const basePrompt = async (options) => {
  const response = await openai.createChatCompletion({
    ...defaultOptions,
    ...options
  }).then(response => response.data)

  saveMessage(response)
  
  return response.choices[0].message.content
}

export { basePrompt };