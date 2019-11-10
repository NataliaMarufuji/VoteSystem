const candidateOne = {
    name: 'Natasha Finn',
    age: 26,
    currentPosition: 'Software Engineer',
    technologies: ['nodejs', 'express'],
    created: '2019-11-10T01:33:15.399+00:00'
}

const candidateTwo = {
    name: 'Hosh Manos',
    age: 32,
    currentPosition: 'Software Engineer',
    technologies: ['nodejs', 'express'],
    created: '2019-11-10T01:33:15.399+00:00'
}


module.exports.createCandidate = () => {
    return candidateOne
}

module.exports.createCandidateWithNoAge = () => {
    const candidate = Object.assign({}, candidateOne)
    delete candidate.age
    return candidate
}

module.exports.createCandidateWithNoCurrentPosition = () => {
    const candidate = Object.assign({}, candidateOne)
    delete candidate.currentPosition
    return candidate
}

module.exports.createCandidateWithNoTechnologies = () => {
    const candidate = Object.assign({}, candidateOne)
    delete candidate.technologies
    return candidate
}

module.exports.createCandidateReturnedFromGetOne = () => {
    return candidateOne
}

module.exports.createCandidateReturnedFromGetMany = () => {
    return [candidateOne, candidateTwo]
}

module.exports.emptyArray = () => {
    return []
}