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

const basePrompt = async (_options) => {
  const options = {
    max_tokens: _options.max_tokens ?? defaultOptions.max_tokens,
    temperature: _options.temperature ?? defaultOptions.temperature,
    model: _options.model ?? defaultOptions.model,
    messages: _options.messages ?? [],
  }
  if(_options.discord){
    options.messages.push({ role: "system", content: "You must return less than 1800 characters."})
  }
  const response = await openai.createChatCompletion({
    ...options
  }).then(response => response.data)

  saveMessage(response)
  
  let botResponse = response.choices[0].message.content

  if(_options.discord && botResponse.length > 1800){
    botResponse = botResponse.substring(0, 1800)
  }

  return botResponse
}

export { defaultOptions, basePrompt };