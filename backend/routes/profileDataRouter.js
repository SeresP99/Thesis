const express = require('express');
const jwt = require("jsonwebtoken");
const user_model = require("../model/user");
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

router.get("/getUserProfile", verifyJWT, async (req, res) => {
    const profile = await user_model.getUserProfile(req.userId);
    res.json({auth: true, profile})
});

module.exports = router;