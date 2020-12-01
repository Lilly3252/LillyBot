const { strike } = require("ffmpeg-static");
const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  moderatorRoleID:String,
  publicrolesID: {
    type: Map,
    of: String,
  },
  emojiPublicRoleId: {
    type: Map,
    of: String,
  },
  welcomechannelID: String,
  logchannelID: String,
  antiRaidMode: Boolean,
});

module.exports = mongoose.model("Guild", guildSchema, "guilds");
