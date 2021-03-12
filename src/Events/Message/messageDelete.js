const Event = require("../../Structures/Event");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  async run(message) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    if (settings.messageDeleteMode = false) {
      return;
    }
    
    if (!message.guild) return;
    if (message.author === null) {
      return;
    }
    

    const embed = new MessageEmbed()
      .setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .addField("❯ Channel", message.channel)
      .setTimestamp(new Date())
      .setFooter("Deleted");

    if (message.content) {
      embed.addField("❯ Content", `${message.content.substring(0, 1020)}`);
    }

    if (message.attachments.size) {
      embed.addField(
        "❯ Attachment(s)",
        `• ${message.attachments
          .map((attachment) => attachment.proxyURL)
          .join("\n• ")}`
      );
    }

    if (!message.content && message.embeds.length) {
      embed.addField("❯ Embeds", `${message.embeds.length}`);
    }
    const ModeratorChannel = settings.logchannelID
    if (!ModeratorChannel || ModeratorChannel === null) return;
    message.client.channels.cache.get(ModeratorChannel).send(embed);
  }
};
