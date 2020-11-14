const LillyClient = require("./Structures/LillyClient");
const config = require("./config.json");
const { DiscordUNO } = require("discord-uno");


const client = new LillyClient(config);
const discordUNO = new DiscordUNO();
client.start();
