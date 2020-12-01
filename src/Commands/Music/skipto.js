const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["skip"],
      category: "🎧Music",
      description: "Skipping the queue to the number desired.",
      usage: "<number>",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    function canModifyQueue(member) {
      const { channelID } = member.voice;
      const botChannel = member.guild.voice.channelID;

      if (channelID !== botChannel) {
        member
          .send("You need to join the voice channel first!")
          .catch(console.error);
        return;
      }

      return true;
    }
    if (!args.length || isNaN(args[0]))
      return message
        .reply("I need a number to be able to skip to the song..")
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message
        .reply(`The queue is only ${queue.songs.length} songs long!`)
        .catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`${message.author} ⏭ skipped ${args[0] - 1} songs`)
      .catch(console.error);
  }
};
