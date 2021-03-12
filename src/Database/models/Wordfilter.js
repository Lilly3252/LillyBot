const mongoose = require("mongoose");

const wordfilterschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  Words: Map,
});
