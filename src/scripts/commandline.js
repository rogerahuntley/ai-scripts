import { simplePrompt, commandPrompt } from "../connect/prompts/index.js";

// eslint-disable-next-line no-unused-vars
const [bun, script, ..._args] = process.argv

// sometimes the arguments are "-c echo 'hello world'", sometimes they're "['-c', 'echo', "'hello", "world'"]"
let args = _args.join(" ").split(" ")

const Mode = {
  PROMPT: 'prompt',
  COMMAND: 'command'
}

const options = {
  max_tokens: 100,
  temperature: 0.7,
  mode: Mode.PROMPT
}

const availableOptions = [
  '-p', '--prompt',
  '-c', '--command',
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
    case '-p':
    case '--prompt':
      if(options.mode != Mode.PROMPT) {
        console.log(`switching to prompt mode`)
        options.mode = Mode.PROMPT
      }
      break
    case '-c':
    case '--command':
      if(options.mode != Mode.COMMAND) {
        options.mode = Mode.COMMAND
      }
      break
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
  }
}

const prompt = args.join(" ")

try {
  const chatOptions = {
    max_tokens: parseFloat(options.max_tokens),
    temperature: parseFloat(options.temperature),
  }

  switch(options.mode) {
    case Mode.PROMPT: {
      console.log(`prompt: ${prompt}`)
      console.log('sending prompt...')
      const response = await simplePrompt(prompt, chatOptions)
      console.log(`response: ${response}`)
      break
    }
    case Mode.COMMAND: {
      const response = await commandPrompt(prompt, chatOptions)
      console.log(`${response}`)
      break
    }
  }
}
catch(e) {
  console.error(e)
}