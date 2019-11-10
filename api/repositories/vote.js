const Vote = require('../models/vote')

module.exports.create = async function(vote) {
    return await Vote.create(vote)
}

module.exports.getOne = async function(filter) {
    return await Vote.findOne(filter)
}

module.exports.getMany = async function(filter, projection) {
    if (filter) return await Vote.find(filter, projection)
    else return await Vote.find()
}

module.exports.count = async function(filter) {
    return await Vote.countDocuments(filter)
}

module.exports.aggregate = async function(pipes) {
    return await Vote.aggregate(pipes)
}