import { simplePrompt } from "../connect/prompts.js";

const test = await simplePrompt("say 'ok'", { max_tokens: 2, temperature: 0})

console.log(test)