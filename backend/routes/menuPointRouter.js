const express = require('express');
const jwt = require("jsonwebtoken");
const polls_model = require("../model/polls");
const JWT_verifier = require("./global/verifyJWT");
const {nanoid} = require("nanoid");
const votes_model = require("../model/votes");
const router = express.Router();

router.get("/getDashboardMenu", JWT_verifier.verifyJWT, async (req, res) => {
    let buttons =
        [
            {
                title: 'Create',
                description: "Create your own polls and invite others to participate!",
                url: "http://pollscape.ddns.net:3000" + "/create"
            },
            {
                title: 'My Own',
                description: "Create your own polls and invite others to participate!",
                url: "http://pollscape.ddns.net:3000" + "/createdPolls"
            },
            {
                title: 'Participate',
                description: "Create your own polls and invite others to participate!",
                url: "http://pollscape.ddns.net:3000" + "/joinedPolls"
            },
            {
                title: 'Profile',
                description: "Create your own polls and invite others to participate!",
                url: "http://pollscape.ddns.net:3000" + "/profile"
            }
        ];
    res.json({auth: true, buttons})
});

module.exports = router;