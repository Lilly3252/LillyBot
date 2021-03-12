const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  moderatorRoleID: String,
  welcomechannelID: String,
  logchannelID: String,
  antiRaidMode: Boolean,
  messageDeleteMode:Boolean,
  messageBulkDeleteMode:Boolean,
  messageUpdateMode:Boolean,
  PersonalizedWelcomeMessage:String
});

module.exports = mongoose.model("Guild", guildSchema, "guilds");
