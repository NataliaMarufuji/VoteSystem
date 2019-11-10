const voteRepository = require('../repositories/vote');
const candidatesRepository = require('../repositories/candidate')

module.exports.registerVote = async(vote) => {
    try {
        return await voteRepository.create(vote)
    } catch (error) {
        throw error
    }
}

module.exports.getAllVotes = async() => {
    try {
        return await voteRepository.getMany()
    } catch (error) {
        throw error
    }
}

module.exports.getPartialResults = async() => {
    try {
        const partials = await getVotesByCandidates()
        partials.sort((a, b) => a.votes < b.votes)
        return partials
    } catch (error) {
        throw error
    }
}

module.exports.getVotesReport = async(day) => {
    try {
        let totalVotes = await voteRepository.count({})
        let votesByHour = await getVotesGroupedByHour(day)
        let votesByCandidates = getVotesByCandidates(totalVotes)

        return {
            total: totalVotes,
            votesByCandidates: votesByCandidates,
            votesByHours: votesByHour
        }
    } catch (error) {
        throw error
    }
}

const getVotesByCandidates = async(total) => {
    let votesByCandidates = []
    let totalVotes = total ? total : await voteRepository.count({})
    let candidates = await candidatesRepository.getMany()
    for (const candidate of candidates) {
        let candidateVotes = await voteRepository.count({ candidate: candidate._id })
        let votesPercent = totalVotes > 0 ? ((candidateVotes / totalVotes) * 100) : 0
        votesByCandidates.push({ name: candidate.name, votes: candidateVotes, votesPercent: votesPercent })
    }
    return votesByCandidates
}

const getVotesGroupedByHour = async(day) => {
    try {
        const today = new Date()
        return await voteRepository.aggregate([{
                $project: {
                    year: { $year: { date: "$created", timezone: "America/Sao_Paulo" } },
                    month: { $month: { date: "$created", timezone: "America/Sao_Paulo" } },
                    day: { $dayOfMonth: { date: "$created", timezone: "America/Sao_Paulo" } },
                    hour: { $hour: { date: "$created", timezone: "America/Sao_Paulo" } }
                }
            },
            {
                $match: {
                    day: day ? parseInt(day) : today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                    hour: { "$in": [00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }
                }
            },
            {
                $group: {
                    _id: '$hour',
                    votes: { $sum: 1 }
                }
            }
        ])
    } catch (error) {
        throw error
    }
}