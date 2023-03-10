import { defaultOptions } from "../connect/connect.js"
import { basePrompt } from "./basePrompt.js"

const simplePrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options}

  const messages = options.messages || [{ role: "user", content: prompt }]

  const lastMessage = messages.pop()
  console.assert(lastMessage.content == prompt, "Last message must be prompt")

  if(options.max_tokens <= 100){
    messages.push(
      { role: "system", content: "You only have to reply with one sentence. Do not write explanations. Do not type commands." },
    )
  }
  if(options.max_tokens > 100 && options.max_tokens <= 500){
    messages.push(
      { role: "system", content: "You have to reply with a paragraph. Do not write explanations." },
    )
  }
  if(options.max_tokens > 500){
    // messages.push(
    //   { role: "system", content: `You have ${options.max_tokens}, try to optimize them.` },
    // )
  }
  return await basePrompt({
    ...options,
    messages: [
      ...messages,
      lastMessage,
    ],
  })
}

export { simplePrompt };