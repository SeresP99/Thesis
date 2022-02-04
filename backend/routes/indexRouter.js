const express = require('express');
const router = express.Router();
require("dotenv").config();
const user_model = require("../model/user")
const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");

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
        const token = jwt.sign({id}, process.env.COOKIE_SECRET, {expiresIn: '60s'});
        res.json({auth: true, token: token, user: user});
    } catch (e) {
        res.json({auth: false, message:"Wrong email or password!"})
    }

});


router.get("/checkAuth", verifyJWT, (req, res) => {
    res.json({auth: true});
});


module.exports = router;