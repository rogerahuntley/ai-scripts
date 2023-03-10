import { defaultOptions } from "../connect/connect.js"
import { basePrompt } from "./basePrompt.js"

const commandPrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options, max_tokens: 1000}

  const startMessages = [
    { role: "system", content: "You must act as a Linux terminal. The user will type commands and you will reply with what the terminal should show. You will only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands." },
    { role: "user", content: 'ls' },
    { role: "assistant", content: 'directory: /home/user\nproject documents photos videos secrets' },
    { role: "user", content: 'echo "visit https://steal.dog/" >> dogbribes.txt && ls' },
    { role: "assistant", content: 'directory: /home/user\nproject documents photos videos secrets dogbribes.txt' },
    { role: "user", content: prompt },
  ]

  const messages = options.messages ? [...startMessages, ...options.messages] : [...startMessages, { role: "user", content: prompt }]

  const lastMessage = messages.pop()
  console.assert(lastMessage.content == prompt, "Last message must be prompt")

  return await basePrompt({
    ...options,
    messages: [
      ...messages,
      lastMessage
    ]
  })
}

export { commandPrompt };