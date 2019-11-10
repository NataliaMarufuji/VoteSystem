var mongoose = require('mongoose');

// Conexão do mongodb usando mongoose. A string de conexão é obtida a partir de uma variável de ambiente.
const url = `mongodb+srv://development:dXMLiQVno0pVDRcY@development-jbawk.azure.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const assert = require('assert');
const sinon = require('sinon');
const userFactory = require('../factories/users.spec')
const userService = require('../services/users.spec')
const userController = require('../../controllers/user')

const name = 'Nathan Philip'
const email = 'nathan.phi@fake.com'
const password = '1234'

describe('userController', () => {
    afterEach(() => {
        sinon.restore()
    });
    describe('isValidUser()', () => {
        it('CT001 - isValidUser(): user.email = null', () => {
            const user = userFactory.createUserWithNoEmail()
            try {
                userController.isValidUser(user)
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT002 - isValidUser(): no passwords', () => {
            const user = userFactory.createUserWithNoPasswords()
            try {
                userController.isValidUser(user)
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT003 - isValidUser(): no password', () => {
            const user = userFactory.createUserWithNoPassword()
            try {
                userController.isValidUser(user)
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT004 - isValidUser(): no passwordConfirm', () => {
            const user = userFactory.createUserWithNoPasswordConfirm()
            try {
                userController.isValidUser(user)
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT005 - isValidUser(): passwords not match', () => {
            const user = userFactory.createUserWithPasswordsNotMatching()
            try {
                userController.isValidUser(user)
            } catch (error) {
                assert.strictEqual(error.message, 'Passwords must match')
            }
        });
        it('CT006 - isValidUser(): ok', () => {
            const user = userFactory.createUser()
            try {
                const isValid = userController.isValidUser(user)
                assert.equal(isValid, true)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    })
    describe('checkIfUserAlreadyExists()', () => {
        it('CT007 - checkIfUserAlreadyExists(): alreadyExists', async() => {
            try {
                const user = userFactory.createUser()
                userService.getByEmail()
                const response = await userController.checkIfUserAlreadyExists(user)
            } catch (error) {
                assert.strictEqual(error.message, 'User already registered with informed e-mail')
            }
        });
        it('CT008 - checkIfUserAlreadyExists(): doesnt exists', async() => {
            try {
                const user = userFactory.createUser()
                userService.getByEmailUserDoesntExists()
                const response = await userController.checkIfUserAlreadyExists(user)
                assert.equal(response, true)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
    });
    describe('createUser()', () => {
        it('CT017 - createUser(): ok', async() => {
            try {
                const user = userFactory.createUser()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, user)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t generate error')
            }
        });
        it('CT018 - createUser(): user already register', async() => {
            try {
                const user = userFactory.createUser()
                userService.getByEmail()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'User already registered with informed e-mail')
            }
        });
        it('CT019 - createUser(): user with no email', async() => {
            try {
                const user = userFactory.createUserWithNoEmail()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT020 - createUser(): user with no password', async() => {
            try {
                const user = userFactory.createUserWithNoPassword()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT021 - createUser(): user with no passwordConfirm', async() => {
            try {
                const user = userFactory.createUserWithNoPasswordConfirm()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT022 - createUser(): user with no passwords', async() => {
            try {
                const user = userFactory.createUserWithNoPasswords()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'Name, e-mail, password or password confirm not informed')
            }
        });
        it('CT023 - createUser(): passwords doesnt match', async() => {
            try {
                const user = userFactory.createUserWithPasswordsNotMatching()
                userService.getByEmailUserDoesntExists()
                userService.create()
                const response = await userController.createUser(user)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'Passwords must match')
            }
        });
    });
    describe('getUserByEmail()', () => {
        it('CT024 - getUserByEmail(): email = null', async() => {
            try {
                userService.getByEmail()
                const response = await userController.getUserByEmail('')
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, 'E-mail not informed')
            }
        });
        it('CT025 - getUserByEmail(): user not found', async() => {
            try {
                userService.getByEmailUserDoesntExists()
                const response = await userController.getUserByEmail(email)
                assert.deepEqual(response, { error: 'shouldn´t go ok' })
            } catch (error) {
                assert.strictEqual(error.message, `User ${email} not found`)
            }
        });
        it('CT026 - getUserByEmail(): user found', async() => {
            try {
                const user = userFactory.createUserReturnedFromGetByEmail()
                userService.getByEmail()
                const response = await userController.getUserByEmail(email)
                assert.deepEqual(response, user)
            } catch (error) {
                assert.strictEqual(error.message, `shouldnt generate error`)
            }
        });
    })
    describe('stringToLowerCase()', () => {
        it('CT127 - stringToLowerCase(): string = null', async() => {
            try {
                const response = await userController.stringToLowerCase('')
                assert.strictEqual(response, '')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
        it('CT128 - stringToLowerCase(): ok', async() => {
            try {
                const response = await userController.stringToLowerCase('TESTE')
                assert.strictEqual(response, 'teste')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
    });
    describe('trimString()', () => {
        it('CT129 - trimString(): string = null', async() => {
            try {
                const response = await userController.trimString('')
                assert.strictEqual(response, '')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
        it('CT130 - trimString(): ok', async() => {
            try {
                const response = await userController.trimString('TE STE')
                assert.strictEqual(response, 'TESTE')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
    });
    describe('formatEmail()', () => {
        it('CT131 - formatEmail(): string = null', async() => {
            try {
                const response = await userController.formatEmail('')
                assert.strictEqual(response, '')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
        it('CT132 - formatEmail(): ok', async() => {
            try {
                const response = await userController.formatEmail('TE STE@FAKE.com')
                assert.strictEqual(response, 'teste@fake.com')
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
    });
    describe('isEmailValid()', () => {
        it('CT133 - isEmailValid(): email = null', async() => {
            try {
                const response = await userController.isEmailValid('')
                assert.equal(response, false)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
        it('CT134 - isEmailValid(): email not valid', async() => {
            try {
                const response = await userController.isEmailValid('teste.com')
                assert.strictEqual(response, false)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
        it('CT135 - isEmailValid(): email valid', async() => {
            try {
                const response = await userController.isEmailValid('teste@fake.com')
                assert.strictEqual(response, true)
            } catch (error) {
                assert.strictEqual(error.message, 'shouldn´t go wrong')
            }
        });
    });
});