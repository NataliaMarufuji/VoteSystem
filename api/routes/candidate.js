const express = require('express'),
    router = express.Router(),
    candidateController = require('../controllers/candidate')

router.route('/candidate/register/')
    .post(createCandidate)

router.route('/candidate/find/all')
    .get(getAllCandidates)

module.exports = router

async function createCandidate(req, res) {
    try {
        const candidate = await candidateController.createCandidate(req.body.candidate)
        res.status(201).send({ success: true, candidate: candidate })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}

async function getAllCandidates(req, res) {
    try {
        const candidates = await candidateController.getAllCandidates()
        res.status(201).send({ success: true, candidates: candidates })
    } catch (e) {
        res.status(e.code || 500).send({ success: false, message: e.message || `Internal Server Error` })
    }
}