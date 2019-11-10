const sinon = require('sinon');
const voteRepository = require('../../repositories/vote')
const voteFactory = require('../factories/vote.spec')

module.exports.getOne = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const vote = sinon.stub(voteRepository, 'getOne');
    vote.returns(voteFactory.createVoteReturnedFromGetOne);
}

module.exports.getOneThatDoesntExists = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const vote = sinon.stub(voteRepository, 'getOne');
    vote.returns(null);
}

module.exports.getMany = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const vote = sinon.stub(voteRepository, 'getMany');
    vote.returns([{
        user: '5d4b7bf6229a2372d86d651b',
        candidate: '5d4b7bf6229a2372d86d651a',
        created: '2019-11-10T01:33:15.399+00:00'
    }, {
        user: '5d4b7bf6229a2372d86d651c',
        candidate: '5d4b7bf6229a2372d86d651d',
        created: '2019-11-10T01:33:15.399+00:00'
    }]);
}

module.exports.getManyThatDoesntExists = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const vote = sinon.stub(voteRepository, 'getMany');
    vote.returns([]);
}

module.exports.create = () => {
    const voteCreate = sinon.stub(voteRepository, 'create');
    voteCreate.resolvesArg(0);
}

module.exports.count = () => {
    const vote = sinon.stub(voteRepository, 'count');
    vote.returns(1);
}

module.exports.aggregate = () => {
    const vote = sinon.stub(voteRepository, 'aggregate');
    vote.returns([{ _id: 10, votes: 1 }, { _id: 11, votes: 2 }]);
}