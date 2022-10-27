const express = require('express');
const poll_options_model = require("../model/poll_options");
const jwt = require("jsonwebtoken");
const JWT_verifier = require("./global/verifyJWT");
const router = express.Router();

router.post("/getPollOption", JWT_verifier.verifyJWT, async (req, res) => {
    const pollOptionId = req.body.optionId;
    const option = await poll_options_model.getPollOption(pollOptionId);
    res.json({auth: true, option})
})

router.post("/getPollOptions", JWT_verifier.verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const options = await poll_options_model.getPollOptions(pollId);
    res.json({auth: true, options});
});

router.post("/addPollOption", JWT_verifier.verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const title = req.body.title;
    const description = req.body.description;
    console.log("poll ID: " + pollId + "\ntitle: " + title + "\n description: " + description);
    const insertion = await poll_options_model.addPollOption(pollId, title, description);
    res.json({auth: true, success: true});
})

router.post("/updatePollOption", JWT_verifier.verifyJWT, async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    console.log("id: " + id + "\n title: " + title + "\n description: " + description);
    const update = await poll_options_model.updatePollOption(id, title, description);
    res.json({auth: true, success: true});
})

router.post("/deletePollOption", JWT_verifier.verifyJWT, async (req, res) => {
    const id = req.body.id;
    const deletion = await poll_options_model.deletePollOption(id);
    console.log(deletion);
    res.json({auth: true, success: true});
})

module.exports = router;