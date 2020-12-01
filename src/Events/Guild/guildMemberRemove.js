const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
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
    const sinceJoinFormatted = moment.utc(member.joinedAt ?? 0).fromNow();
    const joinFormatted = moment
      .utc(member.joinedAt ?? 0)
      .format(DATE_FORMAT_WITH_SECONDS);
    const leaveFormatted = moment.utc().format(DATE_FORMAT_WITH_SECONDS);
    const embed = new MessageEmbed()
      .setColor(COLORS.MEMBER_LEFT)
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
