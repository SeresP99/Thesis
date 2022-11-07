const express = require('express');
require("dotenv").config();

const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

app.use(morgan('dev'));

app.use(cors());
const options = {origin: ['http://localhost:3000', "http://89.134.232.32:3000"]};
app.use(cors(options));

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

const menuPointRouter = require("./routes/menuPointRouter")
app.use("/dashboard", menuPointRouter)

const pollRouter = require("./routes/pollRouter");
app.use("/poll", pollRouter);

const profileDataRouter = require("./routes/profileDataRouter");
app.use("/profile", profileDataRouter);

const voteOptionRouter = require("./routes/voteOptionRouter");
app.use("/voteOptions", voteOptionRouter);

const voteRouter = require("./routes/voteRouter");
app.use("/vote", voteRouter);

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({auth: false, message: "Something went wrong handling your request."})
})

app.listen(process.env.PORT || 4000, () => {
    console.log("Server listening on port 4000.")
});

