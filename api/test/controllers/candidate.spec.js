var mongoose = require('mongoose');

// Conexão do mongodb usando mongoose. A string de conexão é obtida a partir de uma variável de ambiente.
const url = `mongodb+srv://development:dXMLiQVno0pVDRcY@development-jbawk.azure.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const assert = require('assert');
const sinon = require('sinon');
const candidateFactory = require('../factories/candidate.spec')
const candidateService = require('../services/candidate.spec')
const candidateController = require('../../controllers/candidate')

describe('candidateController', () => {
    afterEach(() => {
        sinon.restore()
    });
    describe('createCandidate()', () => {
        it('CT128 - createCandidate(): ok', async() => {
            try {
                const candidate = candidateFactory.createCandidate()
                candidateService.create()
                const response = await candidateController.createCandidate(candidate)
                assert.deepEqual(response, candidate)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT129 - createCandidate(): with no age - ok', async() => {
            try {
                const candidate = candidateFactory.createCandidateWithNoAge()
                candidateService.create()
                const response = await candidateController.createCandidate(candidate)
                assert.deepEqual(response, candidate)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT130 - createCandidate(): with no currentPosition - ok', async() => {
            try {
                const candidate = candidateFactory.createCandidateWithNoCurrentPosition()
                candidateService.create()
                const response = await candidateController.createCandidate(candidate)
                assert.deepEqual(response, candidate)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT131 - createCandidate(): with no technologies - ok', async() => {
            try {
                const candidate = candidateFactory.createCandidateWithNoTechnologies()
                candidateService.create()
                const response = await candidateController.createCandidate(candidate)
                assert.deepEqual(response, candidate)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('getAllCandidates()', () => {
        // it('CT132 - getAllCandidates(): ok', async() => {
        //     try {
        //         const candidates = candidateFactory.createCandidateReturnedFromGetMany()
        //         candidateService.getMany()
        //         const response = await candidateController.getAllCandidates()
        //         response.forEach((resp, index) => {
        //             assert.deepEqual(resp, candidates[index])
        //         })
        //     } catch (error) {
        //         assert.strictEqual(error.message, 'shouldn´t generate error')
        //     }
        // });
        it('CT133- getAllCandidates(): with no candidates - ok', async() => {
            try {
                const candidates = candidateFactory.emptyArray()
                candidateService.getManyThatDoesntExists()
                const response = await candidateController.getAllCandidates()
                assert.deepEqual(response, candidates)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('getAllCandidates()', () => {
        it('CT132 - getAllCandidates(): ok', async() => {
            try {
                const candidates = candidateFactory.createCandidateReturnedFromGetMany()
                candidateService.getMany()
                const response = await candidateController.getAllCandidates()
                response.forEach((resp, index) => {
                    assert.deepEqual(resp, candidates[index])
                })
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT133- getAllCandidates(): with no candidates - ok', async() => {
            try {
                const candidates = candidateFactory.emptyArray()
                candidateService.getManyThatDoesntExists()
                const response = await candidateController.getAllCandidates()
                assert.deepEqual(response, candidates)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
});