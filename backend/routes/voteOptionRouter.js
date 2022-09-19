const express = require('express');
const users_polls_model = require("../model/users_polls");
const jwt = require("jsonwebtoken");
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

router.post("/getPollOptions", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const options = await users_polls_model.getPollOptions(pollId);
    res.json({auth: true, options});
});

router.post("/addPollOption", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const title = req.body.title;
    const description = req.body.description;
    console.log("poll ID: " + pollId + "\ntitle: " + title + "\n description: " + description);
    const insertion = await users_polls_model.addPollOption(pollId, title, description);
    res.json({auth: true, success: true});
})

router.post("/updatePollOption", verifyJWT, async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const update = await users_polls_model.updatePollOption(id, title, description);
    console.log(update);
})

router.post("/deletePollOption", verifyJWT, async (req, res) => {
    const id = req.body.id;
    const deletion = await users_polls_model.deletePollOption(id);
    console.log(deletion);
})

module.exports = router;