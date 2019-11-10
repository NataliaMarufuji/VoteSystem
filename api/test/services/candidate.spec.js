const sinon = require('sinon');
const candidateRepository = require('../../repositories/candidate')
const candidateFactory = require('../factories/candidate.spec')

module.exports.getOne = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const candidate = sinon.stub(candidateRepository, 'getOne');
    candidate.returns(candidateFactory.createCandidateReturnedFromGetOne);
}

module.exports.getOneThatDoesntExists = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const candidate = sinon.stub(candidateRepository, 'getOne');
    candidate.returns(null);
}

module.exports.getMany = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const candidate = sinon.stub(candidateRepository, 'getMany');
    candidate.returns([{
        name: 'Natasha Finn',
        age: 26,
        currentPosition: 'Software Engineer',
        technologies: ['nodejs', 'express'],
        created: '2019-11-10T01:33:15.399+00:00'
    }, {
        name: 'Hosh Manos',
        age: 32,
        currentPosition: 'Software Engineer',
        technologies: ['nodejs', 'express'],
        created: '2019-11-10T01:33:15.399+00:00'
    }]);
}

module.exports.getManyThatDoesntExists = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const candidate = sinon.stub(candidateRepository, 'getMany');
    candidate.returns([]);
}

module.exports.create = () => {
    const candidateCreate = sinon.stub(candidateRepository, 'create');
    candidateCreate.resolvesArg(0);
}