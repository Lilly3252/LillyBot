const Command = require("../../Structures/Command");
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["play"],
      category: "🎧Music",
      description:"Play music using a youtube link",
      usage:"<link>",
      botPerms:['CONNECT','SPEAK']
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "❌ I'm sorry but you need to be in a voice channel to play music!"
      );

    const validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send(`❌ Nuh No! i can't search by words , please enter a proper youtube link. `);
    
    const serverQueue = message.client.queue.get(message.guild.id);

    const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, "$1"));

    const song = {
      id: songInfo.videoDetails.videoId,
      title: Util.escapeMarkdown(songInfo.videoDetails.title),
      url: songInfo.videoDetails.video_url,
    };

    if (serverQueue) {
      serverQueue.songs.push(song);

      return message.channel.send(
        `✅ **${song.title}** has been added to the queue!`
      );
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(
        `I could not join the voice channel: ${error}`
      );
    }
  }
};
