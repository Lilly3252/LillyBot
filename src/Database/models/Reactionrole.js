const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    Guild: String,
    MessageID: String,
    ReactionAndRole: Array,
  })

module.exports = mongoose.model('Reaction', reactionSchema, 'reactions');