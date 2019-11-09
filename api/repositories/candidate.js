const Candidate = require('../models/candidate')

module.exports.create = async function(newCandidate) {
    return await Candidate.create(newCandidate)
}

module.exports.getOne = async function(candidate) {
    return await Candidate.findOne(candidate)
}

module.exports.getMany = async function(filter, projection) {
    if (filter) return await Candidate.find(filter, projection)
    else return await Candidate.find()
}

module.exports.update = async function(filter, set) {
    return await Candidate.findOneAndUpdate(filter, set)
}