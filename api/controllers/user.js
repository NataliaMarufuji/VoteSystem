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

const getUserByEmail = async(userEmail) => {
    try {
        if (!userEmail) throw { code: 404, message: 'E-mail não informado' }
        const existentUser = await userRepository.getByEmail(userEmail)
        if (!existentUser) throw { code: 404, message: `Usuário ${userEmail} não encontrado` }
        return existentUser
    } catch (error) {
        throw error
    }
}
module.exports.getUserByEmail = getUserByEmail

module.exports.getUserById = async(userId) => {
    try {
        if (!userId) throw { code: 404, message: 'ID do usuário não informado' }
        const existentUser = await userRepository.getById(userId)
        if (!existentUser) throw { code: 404, message: `Usuário não encontrado` }
        return existentUser
    } catch (error) {
        throw error
    }
}

const isValidUser = (user) => {
    if (!user.name || !user.password || !user.email || !user.passwordConfirm)
        throw { code: 404, message: `Parâmetro nome, email, senha ou confirmação de senha não informados` }
    if (!isEmailValid(user.email))
        throw { code: 404, message: `Por favor, insira um e-mail válido` }
    if (user.password !== user.passwordConfirm)
        throw { code: 404, message: `A senha e a confirmação de senha não são iguais` }
    return true
}
module.exports.isValidUser = isValidUser

const checkIfUserAlreadyExists = async(user) => {
    try {
        const existentUser = await userRepository.getByEmail(user.email)
        if (existentUser) throw { code: 303, message: `Usuário já registrado com este e-mail` }
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