import { defaultOptions, openai } from "../connect/connect.js";
import { saveMessage } from "../connect/messages.js";

const basePrompt = async (_options) => {
  const options = {
    max_tokens: _options.max_tokens ?? defaultOptions.max_tokens,
    temperature: _options.temperature ?? defaultOptions.temperature,
    model: _options.model ?? defaultOptions.model,
    messages: _options.messages ?? [],
    stream: true,
  };
  if (_options.discord) {
    if (_options.assistant) {
      options.messages.push({
        role: "system",
        content:
          "You must return less than 1800 characters unless you're providing some document (recipe, code, etc.)",
      });
    } else {
      options.messages.push({
        role: "system",
        content: "You must return less than 1800 characters.",
      });
    }
  }

  const axiosOptions = options.stream ? { responseType: "stream" } : {};

  const res = await openai.createChatCompletion(
    {
      ...options,
    },
    axiosOptions
  );

  let botResponse = "";

  if (options.stream) {
    console.log("start stream");


    // wait until finished
    await new Promise((resolve, reject) => {
      res.data.on("data", async (chunk) => {
        let chunkString = "";
        try {
          // split data into objects
          chunkString = chunk.toString().split("data: ");
          chunkString.forEach((chunk) => {
            try {
              if (chunk.length < 1) return;
              if (chunk.trim() == "[DONE]") {
                console.log("end stream");
                resolve(botResponse.trim());
                return;
              }
              const chunkData = JSON.parse(chunk);
              // append to bot response
              // NOTE: if there's a way to reload the entire prompt at the end, that would be better
              const simpleChunk = chunkData?.choices?.[0]?.delta?.content ?? "";
              botResponse += simpleChunk;
              if (_options.handleStream) {
                _options.handleStream(botResponse.trim());
              }
            } catch (err) {
              console.log(chunk);
              console.log(err);
            }
          });
        } catch (err) {
          console.log(chunkString);
          console.log(err);
        }
      });
      // res.data.on("end", () => {
      //   console.log("end stream");
      //   resolve(res.data.read());
      // });
      res.data.on("error", (err) => {
        console.log("error");
        reject(err);
      });
    });
  } else {
    // get full response at once
    const response = await res.data;
    botResponse = response.choices[0].message.content;

    if (_options.saveMessage) {
      saveMessage(response);
    }
  }

  if (_options.discord && botResponse.length > 1800) {
    botResponse = botResponse.substring(0, 1800);
  }

  if (_options.handleStream) {
    _options.handleStream(botResponse.trim());
  }

  return botResponse.trim();
};

export { basePrompt };
