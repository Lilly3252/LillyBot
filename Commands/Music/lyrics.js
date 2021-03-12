const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["lyrics"],
      category: "🎧Music",
      description:"Get the lyric of the current song."
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
const queue = message.client.queue.get(message.guild.id);
if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

let lyrics = null;

try {
  lyrics = await lyricsFinder(queue.songs[0].title, "");
  if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
} catch (error) {
  lyrics = `No lyrics found for ${queue.songs[0].title}.`;
}

let lyricsEmbed = new MessageEmbed()
  .setTitle(`${queue.songs[0].title} — Lyrics`)
  .setDescription(lyrics)
  .setColor("#F8AA2A")
  .setTimestamp();

if (lyricsEmbed.description.length >= 2048)
  lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
return message.channel.send(lyricsEmbed).catch(console.error);
}
};