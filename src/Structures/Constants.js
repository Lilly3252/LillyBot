const { DiscordUNO } = require("discord-uno");

const discordUNO = new DiscordUNO();
exports.discordUNO = discordUNO;

const { DiscordBattleShip } = require("discord-battleship");
const BattleShip = new DiscordBattleShip({prefix: "-"})

exports.BattleShip = BattleShip