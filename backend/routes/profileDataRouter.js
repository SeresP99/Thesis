const express = require('express');
const jwt = require("jsonwebtoken");
const user_model = require("../model/user");
const JWT_verifier = require("./global/verifyJWT");
const router = express.Router();

router.get("/getUserProfile", JWT_verifier.verifyJWT, async (req, res) => {
    const profile = await user_model.getUserProfile(req.userId);
    res.json({auth: true, profile})
});

module.exports = router;