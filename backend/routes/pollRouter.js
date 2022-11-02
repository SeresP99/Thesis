const express = require('express');
const jwt = require("jsonwebtoken");
const polls_model = require("../model/polls");
const JWT_verifier = require("./global/verifyJWT");
const {nanoid} = require("nanoid");
const votes_model = require("../model/votes");
const router = express.Router();



router.get("/getParticipatingPolls", JWT_verifier.verifyJWT, async (req, res) => {
    const polls = await polls_model.getParticipatingPolls(req.userId);
    res.json({auth: true, polls})
});

router.post("/createPoll", JWT_verifier.verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const authorId = decoded.id;
    const poll = req.body;
    const query = await polls_model.createPoll(poll, authorId);
    const pollId = query.id;
    res.json({auth: true, pollId});
});

router.get("/getCreatedPolls", JWT_verifier.verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const authorId = decoded.id;
    const polls = await polls_model.getCreatedPolls(authorId);
    res.json({auth: true, polls})
});

router.post("/getPollDetails", JWT_verifier.verifyJWT, async (req, res) => {
    console.log("FETCHING POLL DETAILS");
    const pollId = req.body.pollId;
    const pollDetails = await polls_model.getPollDetails(pollId);
    res.json({auth: true, pollDetails});
});

router.post("/getPollInvitation", JWT_verifier.verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const invitation = await polls_model.getPollInvitation(pollId);
    if (invitation === undefined) {
        const freshInv = nanoid(10);
        const insertInv = await polls_model.setPollInvitation(freshInv, pollId);
        res.json({auth: true, invitation: insertInv.invitation});
    } else {
        res.json({auth: true, invitation});
    }
});

router.post("/getPollFromInvitation", JWT_verifier.verifyJWT, async (req, res) => {
    const invitation = req.body.invitation;
    const userId = req.userId;

    const poll = await polls_model.getPollFromInvitation(invitation);
    const author = await polls_model.getPollAuthorFromInv(invitation)
    if (author === userId)
        res.json({auth: true, userIsAuthor: true, poll})

    else {

        res.json({auth: true, userIsAuthor: false, poll: poll});
    }
});

router.post("/redeemInvitation", JWT_verifier.verifyJWT, async (req, res) => {
    const userId = req.userId;
    const invitation = req.body.invitation;

    //check if user is trying to invite themselves
    if (await polls_model.getPollAuthorFromInv(invitation) === userId)
        res.json({auth: true, message: "Sorry, but you can't invite yourself."})

    else {
        try {
            const redeem = await polls_model.redeemInvitation(userId, invitation);
            res.json({auth: true, success: true})
        } catch (e) {
            res.json({auth: true, success: false})
        }
    }
});

router.post("/getStandings", JWT_verifier.verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const voteCount = await votes_model.getNumOfVotes(pollId);
    const standings = await votes_model.getStandings(pollId);

    res.json({auth: true, voteCount: voteCount, standings});
});

module.exports = router;