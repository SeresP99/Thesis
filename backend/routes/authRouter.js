const express = require('express');
const user_model = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("we got no token");
        res.json({auth: false, message: "We need a token, please give it to us next time! - server"});
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

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await user_model.getUserId(username, password);
        //console.log("User's credentials: " + JSON.stringify(user));
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
            res.json({success: false, message: "Email and username are not available!"});
        else if (!isEmailAvailable)
            res.json({success: false, message: "Email is not available!"});
        else if (!isUsernameAvailable)
            res.json({success: false, message: "Username is not available!"});
        else
            try {
                const creation = await user_model.createUser(username, email, password);
                res.json({success: true, message: "Account created successfully, you can log in soon!"});
            } catch (e) {
                res.json({success: false, message: "Internal server error."});
            }
    } catch (e) {
        console.error(e.message);
        res.json({success: false, message: "Internal server error."});
    }
});

router.get("/checkAuth", verifyJWT, (req, res) => {
    res.json({auth: true});
});

module.exports = router;