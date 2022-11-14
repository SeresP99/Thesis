const express = require('express');
const jwt = require("jsonwebtoken");
const votes_model = require("../model/votes");
const JWT_verifier = require("./global/verifyJWT");
const router = express.Router();


router.post("/checkAlreadyVoted", JWT_verifier.verifyJWT, async (req, res) => {
    const userId = req.userId;
    const pollId = req.body.pollId;
    const alreadyVoted = await votes_model.checkIfAlreadyVoted(userId, pollId);
    res.json({auth: true, alreadyVoted});
})

router.post("/", JWT_verifier.verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const userId = decoded.id;

    const chosenOptionId = req.body.pollOptionId;
    const fingerprintVerificationKey = req.body.pollVerificationKey;
    const pollId = req.body.pollId;
    let isVerified = true;

    const checkVerificationRequired = await votes_model.checkVerificationRequired(pollId);
    console.log(checkVerificationRequired);
    if (checkVerificationRequired && fingerprintVerificationKey !== "d1pqDLXYgkOmLcR7OJGjV8KmWu0ExSQOBI1aJvFEYy2W6NRWQ8") {
        isVerified = false;
    }

    const checkAlreadyVoted = await votes_model.checkIfAlreadyVoted(userId, pollId);
    if (checkAlreadyVoted)
        res.json({auth: true, success: false, message: "Sorry, you've already voted within this poll."})

    else {
        if (isVerified)
            try {
                const castVote = await votes_model.castVote(userId, chosenOptionId, pollId);
                res.json({auth: true, success: true})
            } catch (e) {
                res.json({auth: true, success: false})
            }
        else res.json({
            auth: true,
            success: false,
            message: "To vote within this poll, you must use our app to verify your identity."
        });

    }

});

module.exports = router;