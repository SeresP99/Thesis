const express = require('express');
const jwt = require("jsonwebtoken");
const users_polls_model = require("../model/users_polls");
const {nanoid} = require("nanoid");
const router = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("we got no token");
        res.send("We need a token, please give it to us next time! - server");
    } else {
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
            if (err) {
                console.log("bad token");
                res.json({auth: false, message: "You failed to authenticate! - server"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

router.get("/getParticipatingPolls", verifyJWT, async (req, res) => {
    const polls = await users_polls_model.getParticipatingPolls(req.userId);
    res.json({auth: true, polls})
});

router.post("/createPoll", verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const authorId = decoded.id;
    const poll = req.body;
    const query = await users_polls_model.createPoll(poll, authorId);
    const pollId = query.id;
    res.json({auth: true, pollId});
});

router.get("/getCreatedPolls", verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const authorId = decoded.id;
    const polls = await users_polls_model.getCreatedPolls(authorId);
    res.json({auth: true, polls})
});

router.post("/getPollDetails", verifyJWT, async (req, res) => {
    console.log("FETCHING POLL DETAILS");
    const pollId = req.body.pollId;
    const pollDetails = await users_polls_model.getPollDetails(pollId);
    res.json({auth: true, pollDetails});
});

router.post("/getPollInvitation", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const invitation = await users_polls_model.getPollInvitation(pollId);
    if (invitation === undefined) {
        const freshInv = nanoid(10);
        const insertInv = await users_polls_model.setPollInvitation(freshInv, pollId);
        res.json({auth: true, invitation: insertInv.invitation});
    } else {
        res.json({auth: true, invitation});
    }
});

router.post("/getPollFromInvitation", verifyJWT, async (req, res) => {
    const invitation = req.body.invitation;
    const userId = req.userId;

    const poll = await users_polls_model.getPollFromInvitation(invitation);
    const author = await users_polls_model.getPollAuthorFromInv(invitation)
    if (author === userId)
        res.json({auth: true, userIsAuthor: true, poll})

    else {

        res.json({auth: true, userIsAuthor: false, poll: poll});
    }
});

router.post("/redeemInvitation", verifyJWT, async (req, res) => {
    const userId = req.userId;
    const invitation = req.body.invitation;

    //check if user is trying to invite themselves
    if (await users_polls_model.getPollAuthorFromInv(invitation) === userId)
        res.json({auth: true, message: "Sorry, but you can't invite yourself."})

    else {
        try {
            const redeem = await users_polls_model.redeemInvitation(userId, invitation);
            res.json({auth: true, success: true})
        } catch (e) {
            res.json({auth: true, success: false})
        }
    }
});

router.post("/getStandings", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const voteCount = await users_polls_model.getNumOfVotes(pollId);
    const standings = await users_polls_model.getStandings(pollId);

    res.json({auth: true, voteCount: voteCount, standings});
});

module.exports = router;