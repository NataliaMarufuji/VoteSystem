const vote = {
    user: '5d4b7bf6229a2372d86d651b',
    candidate: '5d4b7bf6229a2372d86d651a',
    created: '2019-11-10T01:33:15.399+00:00'
}

const vote2 = {
    user: '5d4b7bf6229a2372d86d651c',
    candidate: '5d4b7bf6229a2372d86d651d',
    created: '2019-11-10T01:33:15.399+00:00'
}

module.exports.createVote = () => {
    return vote
}

module.exports.createVoteWithNoCandidate = () => {
    const voteWithNoCandidate = Object.assign({}, vote)
    delete voteWithNoCandidate.candidate
    return voteWithNoCandidate
}

module.exports.createVoteWithNoUser = () => {
    const voteWithNoUser = Object.assign({}, vote)
    delete voteWithNoUser.user
    return voteWithNoUser
}

module.exports.createVoteReturnedFromGetOne = () => {
    return vote
}

module.exports.createVoteReturnedFromGetMany = () => {
    return [vote, vote2]
}

module.exports.createVotesByCandidates = () => {
    const candidateOne = 'Natasha Finn'
    const candidateTwo = 'Hosh Manos'
    return [{ name: candidateOne, votes: 1, votesPercent: 50 }, { name: candidateTwo, votes: 1, votesPercent: 50 }]
}

module.exports.createVotesByHour = () => {
    return [{ _id: 10, votes: 1 }, { _id: 11, votes: 2 }]
}

module.exports.createVoteReport = () => {
    return {
        total: 2,
        votesByCandidates: [{ name: 'Natasha Finn', votes: 1, votesPercent: 50 }, { name: 'Hosh Manos', votes: 1, votesPercent: 50 }],
        votesByHour: [{ _id: 10, votes: 1 }, { _id: 11, votes: 1 }]
    }
}

module.exports.emptyArray = () => {
    return []
}