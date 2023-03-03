import { simplePrompt } from "../connect/prompts.js";

const dogbribes = await simplePrompt("say 'dog bribes is epic'", { max_tokens: 10, temperature: 0.5})

console.log(dogbribes)