const candidateRepository = require('../repositories/candidate');

module.exports.createCandidate = async(candidate) => {
    try {
        return await candidateRepository.create(candidate)
    } catch (error) {
        throw error
    }
}

const checkIfCandidateAlreadyExists = async(candidate) => {
    try {
        const existentCandidate = await candidateRepository.getOne(candidate)
        if (existentCandidate) throw { code: 303, message: `Usuário já registrado com este e-mail` }
        return true
    } catch (error) {
        throw error
    }
}
module.exports.checkIfCandidateAlreadyExists = checkIfCandidateAlreadyExists

module.exports.getAllCandidates = async() => {
    try {
        return await candidateRepository.getMany()
    } catch (error) {
        throw error
    }
}