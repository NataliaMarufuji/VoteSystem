const mongoose = require('mongoose')

const candidateSchema = mongoose.Schema({
    created: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    age: Number,
    currentPosition: { type: String, required: true },
    technologies: [String]
})

//candidateSchema.index({ 'email': 1 }, { unique: true, name: 'emailUnique' });

module.exports = mongoose.model('Candidate', candidateSchema)