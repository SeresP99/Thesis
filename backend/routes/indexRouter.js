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

module.exports = router;