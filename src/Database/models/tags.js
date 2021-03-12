const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  Name: String,
  Content: String
});

module.exports = mongoose.model("Tag", tagSchema, "tag");
