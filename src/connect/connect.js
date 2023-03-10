import { Configuration, OpenAIApi } from "openai"

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
  discord: false,     // adds character limit to 1800
  saveMessage: false, // saves to super basic db folder
}

export { defaultOptions, openai };