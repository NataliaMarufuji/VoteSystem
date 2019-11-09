const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    created: { type: Date, default: Date.now() },
    user: { type: String, required: true },
    candidate: { type: String, required: true },
})

module.exports = mongoose.model('Vote', voteSchema)