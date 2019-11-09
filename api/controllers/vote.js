const voteRepository = require('../repositories/vote');
const candidatesRepository = require('../repositories/candidate')

module.exports.registerVote = async(vote) => {
    try {
        vote.created = new Date()
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

module.exports.getVotesReport = async() => {
    try {
        let votesByCandidates = []
        let totalVotes = await voteRepository.count({})
        let candidates = await candidatesRepository.getMany()
        let votesByHour = await getVotesGroupedByHour()

        for (const candidate of candidates) {
            let candidateVotes = await voteRepository.count({ candidate: candidate._id })
            votesByCandidates.push({ name: candidate.name, votes: candidateVotes })
        }

        return {
            total: totalVotes,
            votesByCandidates: votesByCandidates,
            votesByHours: votesByHour
        }
    } catch (error) {
        throw error
    }
}

const getVotesGroupedByHour = async() => {
    try {
        return await voteRepository.aggregate([{
                $project: {
                    hour: { $hour: "$created" }
                }
            },
            {
                $match: {
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