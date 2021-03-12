const Command = require("../../Structures/Command");
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["queue"],
      category: "🎧Music",
      description:"Tells you what is the queue/playlist currently stored.",
      usage:""
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");

    const Qembed = new MessageEmbed()
    .setTitle('🎶Song Queue🎶')
    .setDescription(`Song,
      ${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}`)
    .setColor('RANDOM');
    message.channel.send(Qembed);
   }
};
