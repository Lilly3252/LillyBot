const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Event
) {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }

  async run(member) {
    if (!member.guild) return;
    const settings = await Guild.findOne({
        guildID: member.guild.id,
      });
   
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${member.user.tag} (${member.id})`,
        member.user.displayAvatarURL()
      )
      .setFooter("User left")
      .setTimestamp(new Date());
      const channelLogs = member.guild.channels.cache.get(settings.logchannelID);
      if (!channelLogs) return;
      channelLogs.send(embed);
  }
};
