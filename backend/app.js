const express = require('express');
require("dotenv").config();

const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");

app.use(cors());
const options = {origin: ['http://localhost:3000', "http://89.134.232.32:3000"]};
app.use(cors(options));

/*app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);*/

/*app.use(
    cors({
        credentials: true,
        origin: process.env.EXTERNAL_CLIENT_URL,
    })
)*/


app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        cookie: {
            //check if we are in production mode
            secure: process.env.NODE_ENV === 'production' ? "true" : "lax",
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        },
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

const pollRouter = require("./routes/pollRouter");
app.use("/poll", pollRouter);

const profileDataRouter = require("./routes/profileDataRouter");
app.use("/profile", profileDataRouter);

const voteOptionRouter = require("./routes/voteOptionRouter");
app.use("/voteOptions", voteOptionRouter);

const voteRouter = require("./routes/voteRouter");
app.use("/vote", voteRouter);

app.listen(process.env.PORT || 4000, () => {
    console.log("Server listening on port 4000.")
});