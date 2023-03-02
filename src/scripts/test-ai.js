import { simplePrompt } from "connect/connect.js";

const test = await simplePrompt("say 'ok'", { max_tokens: 2, temperature: 0})

console.log(test)