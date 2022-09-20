const bot = require("./bot.js");
const scraping = require("./scraping.js");

bot(async (msg, client) => {
    try {
        console.log(`${msg.from} esta buscando: ${msg.body}`);
        client.sendMessage(msg.from, "Buscando.. ⌛");
        const result = await scraping(msg.body);
        if (result) {
            client.sendMessage(msg.from, result);
        } else {
            client.sendMessage(msg.from, "No encontramos nada.. 😥");
        }
    } catch (err) {}
});
