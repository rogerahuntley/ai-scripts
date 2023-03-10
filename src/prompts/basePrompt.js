import { defaultOptions, openai } from "../connect/connect.js"
import { saveMessage } from "../connect/messages.js"

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

  if(_options.saveMessage){
    saveMessage(response)
  }
  
  let botResponse = response.choices[0].message.content

  if(_options.discord && botResponse.length > 1800){
    botResponse = botResponse.substring(0, 1800)
  }

  return botResponse
}

export { basePrompt }