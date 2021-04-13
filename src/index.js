const LillyClient = require("./Structures/LillyClient");
const config = require("./config.json");

const client = new LillyClient(config);

const mongoose = require('mongoose');

mongoose.connect('LINK',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true});
console.log('im connected to Database!');

client.start();
