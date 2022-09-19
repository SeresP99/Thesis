const express = require('express');
const jwt = require("jsonwebtoken");
const users_polls_model = require("../model/users_polls");
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

router.post("/", verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const userId = decoded.id;

    const chosenOptionId = req.body.pollOptionId;
    const pollId = req.body.pollId;

    const checkAlreadyVoted = await users_polls_model.checkIfAlreadyVoted(userId, pollId);
    if (checkAlreadyVoted)
        res.json({auth: true, success: false})

    else {
        try {
            const castVote = await users_polls_model.castVote(userId, chosenOptionId, pollId);
            res.json({auth: true, success: true})
        }
        catch (e) {
            res.json({auth: true, success: false})
        }
    }
});

module.exports = router;