import { simplePrompt } from "connect/connect.js";

// eslint-disable-next-line no-unused-vars
const [bun, script, ...args] = process.argv

const options = {
  max_tokens: 100,
  temperature: 0.7
}

const availableOptions = [
  '-m', '--max-tokens',
  '-t', '--temperature',
  '--short',
  '--normal',
  '--medium',
  '--long',
  '--full'
]

while(args.length > 0 && availableOptions.includes(args[0])) {
  const option = args.shift()
  switch(option) {
    case '-m':
    case '--max-tokens':
      options.max_tokens = args.shift()
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    case '-t':
    case '--temperature':
      options.temperature = args.shift()
      console.log(`setting temperature to: ${options.temperature}`)
      break
    case '--short':
      options.max_tokens = 10
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    case `--normal`:
      options.max_tokens = 100
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    case '--medium':
      options.max_tokens = 500
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    case '--long':
      options.max_tokens = 1000
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    case '--full':
      options.max_tokens = 4000
      console.log(`setting max tokens to: ${options.max_tokens}`)
      break
    default:
      break
  }
}

const prompt = args.join(" ")

console.log(`prompt: ${prompt}`)
console.log('sending prompt...')

const response = await simplePrompt(prompt, options)

console.log(`response: ${response}`)