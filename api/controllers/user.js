const userRepository = require('../repositories/user');

module.exports.createUser = async(user) => {
    try {
        user.email = formatEmail(user.email)
        isValidUser(user)
        await checkIfUserAlreadyExists(user)
        const newUser = await userRepository.create(user)
        return newUser
    } catch (error) {
        throw error
    }
}

module.exports.authenticateAdministrator = async(token) => {
    try {
        return token === 'kvAiJ8tdTfq2JMAuO53VPoTXNqBVaTmB'
    } catch (error) {
        throw error
    }
}

module.exports.authenticateUser = async(email, password) => {
    try {
        const user = await userRepository.getByEmail(email)
        if (!user) return false
        return user.password === password
    } catch (error) {
        throw error
    }
}

const getUserByEmail = async(userEmail) => {
    try {
        if (!userEmail) throw { code: 404, message: 'E-mail not informed' }
        const existentUser = await userRepository.getByEmail(userEmail)
        if (!existentUser) throw { code: 404, message: `User ${userEmail} not found` }
        return existentUser
    } catch (error) {
        throw error
    }
}
module.exports.getUserByEmail = getUserByEmail

const isValidUser = (user) => {
    if (!user.name || !user.password || !user.email || !user.passwordConfirm)
        throw { code: 404, message: `Name, e-mail, password or password confirm not informed` }
    if (!isEmailValid(user.email))
        throw { code: 404, message: `Invalid e-mail` }
    if (user.password !== user.passwordConfirm)
        throw { code: 404, message: `Passwords must match` }
    return true
}
module.exports.isValidUser = isValidUser

const checkIfUserAlreadyExists = async(user) => {
    try {
        const existentUser = await userRepository.getByEmail(user.email)
        if (existentUser) throw { code: 303, message: `User already registered with informed e-mail` }
        return true
    } catch (error) {
        throw error
    }
}
module.exports.checkIfUserAlreadyExists = checkIfUserAlreadyExists

const formatEmail = (email) => { return email ? stringToLowerCase(trimString(email)) : '' }

const trimString = (str) => { return str ? str.replace(/\s/g, '') : '' }

const stringToLowerCase = (str) => { return str ? str.toLowerCase() : '' }

const isEmailValid = (email) => {
    if (!email) return false
    email = trimString(email)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.stringToLowerCase = stringToLowerCase
module.exports.trimString = trimString
module.exports.formatEmail = formatEmail
module.exports.isEmailValid = isEmailValid