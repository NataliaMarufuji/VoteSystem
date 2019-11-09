const User = require('../models/user')

module.exports.create = async function(newUser) {
    return await User.create(newUser)
}

module.exports.getById = async function(id) {
    return await User.findById(id)
}

module.exports.getByEmail = async function(email) {
    return await User.findOne({ email: email })
}

module.exports.update = async function(filter, set) {
    return await User.findOneAndUpdate(filter, set)
}