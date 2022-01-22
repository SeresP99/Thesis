const express = require('express');
const router = express.Router();
require("dotenv").config();
const user_model = require("../model/user")
const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");

router.use(express.json());

const verifyJWT = (req, res, next) => {
    const token = req.headers["X-access-Token"];

    if (!token) {
        res.send("We need a token, please give it to us next time! - server")
    } else {
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "You failed to authenticate! - server"})
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

router.get("/", (req, res) => {
    res.send("hi home");
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await user_model.getUserId(username, password);
    console.log("User's credentials: " + user);
    const id = user.id;
    const token = jwt.sign({id}, process.env.COOKIE_SECRET, {expiresIn: '60s'});

    res.json({auth: true, token: token, user: user});
});


router.get("/profile", verifyJWT, (req, res) => {
    res.send("You are authenticated!");
});


module.exports = router;