import { simplePrompt } from "../connect/prompts/index.js";

const test = await simplePrompt("say 'ok'", { max_tokens: 2, temperature: 0})

console.log(test)