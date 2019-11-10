const express = require('express'),
    router = express.Router(),
    voteController = require('../controllers/vote')

router.route('/vote/register/')
    .post(registerVote)

router.route('/vote/find/all')
    .get(getAllVotes)

router.route('/vote/report/:day?')
    .get(getVotesReport)

router.route('/vote/partial/results')
    .get(getPartialResults)

module.exports = router

async function registerVote(req, res) {
    try {
        await voteController.registerVote(req.body.vote)
        res.status(201).send({ success: true })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}

async function getAllVotes(req, res) {
    try {
        const votes = await voteController.getAllVotes()
        res.status(201).send({ success: true, votes: votes })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}

async function getVotesReport(req, res) {
    try {
        const report = await voteController.getVotesReport(req.params.day)
        res.status(201).send({ success: true, report })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}

async function getPartialResults(req, res) {
    try {
        const results = await voteController.getPartialResults()
        res.status(201).send({ success: true, results })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}