import { simplePrompt } from "connect/connect.js";

console.log(process.argv)

// eslint-disable-next-line no-unused-vars
const [bun, script, ...args] = process.argv

const prompt = args.join(" ")

console.log(`prompt: ${prompt}`)
console.log('sending prompt...')

const response = await simplePrompt(prompt)

console.log(`response: ${response}`)