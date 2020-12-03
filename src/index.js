const LillyClient = require("./Structures/LillyClient");
const config = require("./config.json");
const { DiscordUNO } = require("discord-uno");
const client = new LillyClient(config);
const discordUNO = new DiscordUNO();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Lilly-dev:V0TFU0jowTxpIvyd@lillybot.43rtj.mongodb.net/Lilly',{
useNewUrlParser: true ,useUnifiedTopology: true});
console.log('im connected to Database!');

client.start();
