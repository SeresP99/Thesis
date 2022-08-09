const express = require('express');
const router = express.Router();
require("dotenv").config();
const user_model = require("../model/user")
const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const {stringify} = require("nodemon/lib/utils");
const users_polls_model = require("../model/users_polls");
const {nanoid} = require("nanoid");
//import { nanoid } from 'nanoid'

router.use(express.json());

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

const GetUserId = (req) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    return decoded.id;
}

router.get("/", (req, res) => {
    res.send("server home");
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);

    try {
        const user = await user_model.getUserId(username, password);
        console.log("User's credentials: " + JSON.stringify(user));
        const id = user.id;
        const token = jwt.sign({id}, process.env.COOKIE_SECRET, {expiresIn: '1h'});
        res.json({auth: true, token: token, user: user});
    } catch (e) {
        res.json({auth: false, message: "Wrong email or password!"})
    }

});


router.post("/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const isEmailAvailable = await user_model.checkIfEmailAvailable(email);
        const isUsernameAvailable = await user_model.checkIfUsernameAvailable(username);

        if (!isEmailAvailable && !isUsernameAvailable)
            res.json({success: false, message: "Email and username are not available!"})
        else if (!isEmailAvailable)
            res.json({success: false, message: "Email is not available!"})
        else if (!isUsernameAvailable)
            res.json({success: false, message: "Username is not available!"})
        else
            try {
                const creation = await user_model.createUser(username, email, password);
                res.json({success: true, message: "Account created successfully, you can log in soon!"})
            } catch (e) {
                res.json({success: false, message: "Internal server error."})
            }
    } catch (e) {
        console.error(e.message);
        res.json({success: false, message: "Internal server error."})
    }
});

router.get("/getUserProfile", verifyJWT, async (req, res) => {
    const profile = await user_model.getUserProfile(req.userId);
    res.json({auth: true, profile})
});

router.get("/getParticipatingPolls", verifyJWT, async (req, res) => {
    const polls = await users_polls_model.getParticipatingPolls(req.userId);
    res.json({auth: true, polls})
});

router.post("/getPollDetails", verifyJWT, async (req, res) => {
    console.log("FETCHING POLL DETAILS");
    const pollId = req.body.pollId;
    const pollDetails = await users_polls_model.getPollDetails(pollId);
    res.json({auth: true, pollDetails});
});


router.get("/checkAuth", verifyJWT, (req, res) => {
    res.json({auth: true});
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

router.post("/getPollInvitation", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const query = await users_polls_model.getPollInvitation(pollId);
    if (query.invitation === null) {
        const freshInv = nanoid(10);
        const insertInv = await users_polls_model.setPollInvitation(freshInv, pollId);
        res.json({auth: true, invitation: insertInv.invitation});
    } else {
        res.json({auth: true, invitation: query.invitation});
    }
});

router.post("/getPollFromInvitation", verifyJWT, async (req, res) => {
    const invitation = req.body.invitation;
    const userId = GetUserId(req);

    const poll = await users_polls_model.getPollFromInvitation(invitation);
    const author = await users_polls_model.getPollAuthorFromInv(invitation)
    if (author === userId)
        res.json({auth: true, userIsAuthor: true, poll})

    else {

        res.json({auth: true, userIsAuthor: false, poll: poll});
    }
});

router.post("/redeemInvitation", verifyJWT, async (req, res) => {
    const userId = await GetUserId(req);
    const invitation = req.body.invitation;

    //check is user is trying to invite themselves
    if (await users_polls_model.getPollAuthorFromInv(invitation) === userId)
        res.json({auth: true, message: "Sorry, but you can't invite yourself."})


});

router.get("/getCreatedPolls", verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const authorId = decoded.id;
    const polls = await users_polls_model.getCreatedPolls(authorId);
    res.json({auth: true, polls})
})

router.post("/getPollOptions", verifyJWT, async (req, res) => {
    const pollId = req.body.pollId;
    const options = await users_polls_model.getPollOptions(pollId);
    res.json({auth: true, options});
})

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

router.post("/vote", verifyJWT, async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    const userId = decoded.id;

    const chosenOptionId = req.body.pollOptionId;
    const pollId = req.body.pollId;

    const castVote = await users_polls_model.castVote(userId, chosenOptionId, pollId);
    console.log(castVote);
});

module.exports = router;