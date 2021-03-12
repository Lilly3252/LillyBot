const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["volume"],
      category: "🎧Music",
      description:"Set the volume to the volume desired ( blocked at 10 )",
      usage:"<number>"
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    if (!args[0])
      return message.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    if (args[0] > 10)
      return message.channel.send(
        `❌ Nuh no ! my maximum is 10 , don't try to go higher`
      );
    serverQueue.volume = args[0]; // eslint-disable-line
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`I set the volume to: **${args[0]}**`);
  }
};
