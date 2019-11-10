const sinon = require('sinon');
const userRepository = require('../../repositories/user')

const name = 'Nathan Philip'
const email = 'nathan.phi@fake.com'
const password = '1234'
const created = '2019-11-10T01:33:15.399+00:00'

module.exports.getByEmail = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const userGetByEmail = sinon.stub(userRepository, 'getByEmail');
    userGetByEmail.returns({
        _id: "5d4b7bf6229a2372d86d651b",
        created: created,
        name: name,
        email: email,
        password: password
    });
}

module.exports.getByEmailUserDoesntExists = () => {
    const print = sinon.stub(console, 'log');
    print.returns({});

    const userGetByEmail = sinon.stub(userRepository, 'getByEmail');
    userGetByEmail.returns(null);
}

module.exports.create = () => {
    const userCreate = sinon.stub(userRepository, 'create');
    userCreate.resolvesArg(0);
}

module.exports.update = () => {
    const userUpdate = sinon.stub(userRepository, 'update');
    userUpdate.returns({
        _id: "5d4b7bf6229a2372d86d651b",
        created: created,
        name: name,
        email: email,
        password: password
    });
}