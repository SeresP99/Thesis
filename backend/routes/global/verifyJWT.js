const jwt = require("jsonwebtoken");

class JWT_verifier {
    static verifyJWT = (req, res, next) => {
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
}

module.exports = JWT_verifier;