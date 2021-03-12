const LillyClient = require("./Structures/LillyClient");
const config = require("./config.json");

const client = new LillyClient(config);

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Lilly-dev:V0TFU0jowTxpIvyd@lillybot.43rtj.mongodb.net/Lilly',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true});
console.log('im connected to Database!');

client.start();
