var mongoose = require('mongoose');

// Conexão do mongodb usando mongoose. A string de conexão é obtida a partir de uma variável de ambiente.
const url = `mongodb+srv://development:dXMLiQVno0pVDRcY@development-jbawk.azure.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const assert = require('assert');
const sinon = require('sinon');
const voteFactory = require('../factories/vote.spec')
const voteService = require('../services/vote.spec')
const voteController = require('../../controllers/vote')
const candidateService = require('../services/candidate.spec')

describe('voteController', () => {
    afterEach(() => {
        sinon.restore()
    });
    describe('validateVote()', () => {
        it('CT133 - validateVote(): with no candidate', async() => {
            try {
                const vote = voteFactory.createVoteWithNoCandidate()
                const response = await voteController.validateVote(vote)
                assert.strictEqual(error.message, 'shouldn´t go ok')
            } catch (error) {
                assert.strictEqual(error.message, 'Is not possible to reigster vote without a candidate')
            }
        });
        it('CT134 - validateVote(): with no user', async() => {
            try {
                const vote = voteFactory.createVoteWithNoUser()
                const response = await voteController.validateVote(vote)
                assert.strictEqual(error.message, 'shouldn´t go ok')
            } catch (error) {
                assert.strictEqual(error.message, 'Is not possible to reigster vote without a user')
            }
        });
        it('CT135 - validateVote(): ok', async() => {
            try {
                const vote = voteFactory.createVote()
                const response = await voteController.validateVote(vote)
                assert.strictEqual(response, true)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('createVote()', () => {
        it('CT136 - createVote(): ok', async() => {
            try {
                const vote = voteFactory.createVote()
                voteService.create()
                const response = await voteController.registerVote(vote)
                assert.deepEqual(response, vote)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT137 - createVote(): with no candidate', async() => {
            try {
                const vote = voteFactory.createVoteWithNoCandidate()
                voteService.create()
                const response = await voteController.registerVote(vote)
                assert.strictEqual(error.message, 'shouldn´t go ok')
            } catch (error) {
                assert.strictEqual(error.message, 'Is not possible to reigster vote without a candidate')
            }
        });
        it('CT138 - createVote(): with no user', async() => {
            try {
                const vote = voteFactory.createVoteWithNoUser()
                voteService.create()
                const response = await voteController.registerVote(vote)
                assert.strictEqual(error.message, 'shouldn´t go ok')
            } catch (error) {
                assert.strictEqual(error.message, 'Is not possible to reigster vote without a user')
            }
        });
    });
    describe('getAllVotes()', () => {
        it('CT139 - getAllVotes(): ok', async() => {
            try {
                const votes = voteFactory.createVoteReturnedFromGetMany()
                voteService.getMany()
                const response = await voteController.getAllVotes()
                assert.deepEqual(response, votes)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT140 - getAllVotes(): with no votes', async() => {
            try {
                const votes = voteFactory.emptyArray()
                voteService.getManyThatDoesntExists()
                const response = await voteController.getAllVotes()
                assert.deepEqual(response, votes)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('getVotesByCandidates()', () => {
        it('CT141 - getVotesByCandidates(): ok', async() => {
            try {
                const votes = voteFactory.createVotesByCandidates()
                candidateService.getMany()
                voteService.count()
                const response = await voteController.getVotesByCandidates(2)
                response.forEach((resp, index) => {
                    assert.deepEqual(resp, votes[index])
                })
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('getVotesByCandidates()', () => {
        it('CT142 - getVotesGroupedByHour(): ok not informing data', async() => {
            try {
                const votes = voteFactory.createVotesByHour()
                voteService.aggregate()
                const response = await voteController.getVotesGroupedByHour()
                response.forEach((resp, index) => {
                    assert.deepEqual(resp, votes[index])
                })
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT143 - getVotesGroupedByHour(): ok informing data', async() => {
            try {
                const votes = voteFactory.createVotesByHour()
                voteService.aggregate()
                const response = await voteController.getVotesGroupedByHour(10)
                response.forEach((resp, index) => {
                    assert.deepEqual(resp, votes[index])
                })
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
});