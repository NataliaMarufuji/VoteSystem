const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user')

router.route('/users/signup/')
    .post(createUser)

router.route('/users/find/email/:email/')
    .get(getUserByEmail)

module.exports = router

async function createUser(req, res) {
    try {
        const createdUser = await userController.createUser(req.body.user)
        res.status(201).send({ success: true, user: createdUser })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}

async function getUserByEmail(req, res) {
    try {
        const userEmail = req.params.email
        const existentUser = await userController.getUserByEmail(userEmail)
        res.status(201).send({ sucess: true, user: existentUser })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: `Usuário não encontrado` || `Internal Server Error` })
    }
}