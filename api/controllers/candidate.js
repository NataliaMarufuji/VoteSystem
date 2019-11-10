const candidateRepository = require('../repositories/candidate');

module.exports.createCandidate = async(candidate) => {
    try {
        return await candidateRepository.create(candidate)
    } catch (error) {
        throw error
    }
}

module.exports.getAllCandidates = async() => {
    try {
        return await candidateRepository.getMany()
    } catch (error) {
        throw error
    }
}