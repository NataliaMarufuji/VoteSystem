const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    created: { type: Date, default: new Date() },
    user: { type: String, required: true },
    candidate: { type: String, required: true },
})

module.exports = mongoose.model('Vote', voteSchema)