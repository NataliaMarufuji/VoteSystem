const candidateRepository = require('../repositories/candidate');

module.exports.createCandidate = async(candidate) => {
    try {
        validateCandidate(candidate)
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

const validateCandidate = (candidate) => {
    if (candidate.name) throw new Error('Enter the candidate´s name')
}