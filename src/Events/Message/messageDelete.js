const Event = require("../../Structures/Event");
const { Message, MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Event
) {
  async run(message) {
    if (!message.guild || message.author.bot) return;

    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

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

    embed.addField("Link!!", `[Click here to see the message](${message.url})`, true);
    const channelLogs = message.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
