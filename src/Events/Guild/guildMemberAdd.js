const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
const moment = require("moment");
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
    function colorFromDuration(duration = Number) {
      const percent = Math.min(duration / (MAX_TRUST_ACCOUNT_AGE / 100), 100);
      let r;
      let g;
      let b = 0;

      if (percent < 50) {
        r = 255;
        g = Math.round(5.1 * percent);
      } else {
        g = 255;
        r = Math.round(510 - 5.1 * percent);
      }

      const tintFactor = 0.3;

      r += (255 - r) * tintFactor;
      g += (255 - g) * tintFactor;
      b += (255 - b) * tintFactor;

      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    const sinceCreationFormatted = moment
      .utc(member.user.createdAt ?? 0)
      .fromNow();
    const creationFormatted = moment
      .utc(member.user.createdAt ?? 0)
      .format(DATE_FORMAT_WITH_SECONDS);
    const joinFormatted = moment.utc().format(DATE_FORMAT_WITH_SECONDS);
    const embed = new MessageEmbed()
      .setColor(colorFromDuration(Date.now() - member.user.createdTimestamp))
      .setAuthor(
        `${member.user.tag} (${member.id})`,
        member.user.displayAvatarURL()
      )
      .setFooter("User joined")
      .setTimestamp(new Date());
      const channelLogs = member.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
