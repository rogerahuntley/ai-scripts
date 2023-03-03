import storage from "node-persist"

await storage.init({
  dir: "db",
});

const allMessages = await storage.getItem("allMessages") || {}

const saveMessage = async (message) => {
  allMessages[message.id] = message
  await storage.setItem("allMessages", allMessages)
}

export { saveMessage };