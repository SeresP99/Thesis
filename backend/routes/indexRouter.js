const express = require('express');
const router = express.Router();
require("dotenv").config();
const user_model = require("../model/user")
const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const {stringify} = require("nodemon/lib/utils");
const users_polls_model = require("../model/users_polls");

router.use(express.json());

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need a token, please give it to us next time! - server")
    } else {
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
            if (err) {
                console.log("bad token");
                res.json({auth: false, message: "You failed to authenticate! - server"})
            } else {
                console.log("correct token");
                req.userId = decoded.id;
                next();
            }
        });
    }
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
        const token = jwt.sign({id}, process.env.COOKIE_SECRET, {expiresIn: '900s'});
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

router.get("/getCreatedPolls", verifyJWT, async (req, res) => {
    const polls = await users_polls_model.getCreatedPolls(req.userId);
    console.log(polls);
    res.json({auth: true, polls})
})

router.get("/checkAuth", verifyJWT, (req, res) => {
    res.json({auth: true});
});


module.exports = router;