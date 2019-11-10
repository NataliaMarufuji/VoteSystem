const name = 'Nathan Philip'
const email = 'nathan.phi@fake.com'
const password = '1234'
const created = '2019-11-10T01:33:15.399+00:00'

module.exports.createUser = () => {
    return {
        "name": name,
        "email": email,
        "password": password,
        "passwordConfirm": password
    }
}

module.exports.createUserWithNoEmail = () => {
    return {
        "name": name,
        "password": password,
        "passwordConfirm": password
    }
}

module.exports.createUserWithNoPasswords = () => {
    return {
        "name": name,
        "email": email
    }
}

module.exports.createUserWithNoPassword = () => {
    return {
        "name": name,
        "email": email,
        "passwordConfirm": password
    }
}

module.exports.createUserWithNoPasswordConfirm = () => {
    return {
        "name": name,
        "email": email,
        "password": password
    }
}

module.exports.createUserWithPasswordsNotMatching = () => {
    return {
        "name": name,
        "email": email,
        "password": password,
        "passwordConfirm": "12345"
    }
}

module.exports.createUserReturnedFromGetByEmail = () => {
    return {
        _id: "5d4b7bf6229a2372d86d651b",
        created: created,
        name: name,
        email: email,
        password: password
    }
}