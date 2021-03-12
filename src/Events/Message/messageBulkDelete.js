const Event = require("../../Structures/Event");
const { Message ,Collection, MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild");

// * TO-DO : Make this work... 


module.exports = class extends Event {

  async run(message = new Collection(String, Message)) {

    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

    if (settings.messageBulkDeleteMode === false) {
      return;
    }

    
    //** CODE HERE !**//


    const ModeratorChannel = settings.logchannelID
    if (!ModeratorChannel || ModeratorChannel === null) return
    message.client.channels.cache.get(ModeratorChannel).send(embed);
    
  }
};
