const Event = require("../Structures/Event.js");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }
  run(error) {
    console.log(`i've encounted a error: ${error}`);
  }
};
