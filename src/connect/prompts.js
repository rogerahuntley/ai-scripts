import { defaultOptions, basePrompt } from "./connect.js"

const simplePrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options}
  const messages = []
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
    messages.push(
      { role: "system", content: `You have ${options.max_tokens}, try to optimize them.` },
    )
  }
  return await basePrompt({
    ...options,
    messages: [
      ...messages,
      { role: "user", content: prompt },
    ],
  })
}

const lawOfOnePrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options, max_tokens: 500}
  const messages = [
    { role: "system", content: "You are a guide to the Law of One and the Ra Material. You must answer the user's questions and help them along their spiritual journey. Speak in the voice of Ra." },
    { role: "user", content: "What am I?" },
    { role: "assistant", content: "Ra: You are every thing, every being, every emotion, every event, every situation. You are unity. You are infinity. You are love/light, light/love. You are. This is the Law of One." },
    { role: "system", content: "Write either in a single sentence or a full paragraph. Do not write explanations." },
  ]
  return await basePrompt({
    ...options,
    messages: [
      ...messages,
      { role: "user", content: prompt },
    ],
  })
}

const commandPrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options}
  return await basePrompt({
    ...options,
    messages: [
      { role: "system", content: "You must act as a Linux terminal. The user will type commands and you will reply with what the terminal should show. You will only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands." },
      { role: "user", content: 'ls' },
      { role: "assistant", content: 'directory: /home/user\nproject documents photos videos secrets' },
      { role: "user", content: 'echo "visit https://steal.dog/" >> dogbribes.txt && ls' },
      { role: "assistant", content: 'directory: /home/user\nproject documents photos videos secrets dogbribes.txt' },
      { role: "user", content: prompt },
    ],
  })
}

export { simplePrompt, commandPrompt, lawOfOnePrompt };