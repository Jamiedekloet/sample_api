const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    let bool = false;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        } else if(!err) {
            bool = true;
        }
    });

    return bool;
};

createToken = (username) => {
    return jwt.sign(
        {
            id: username,
        },
        config.secret,
        {
            expiresIn: config.JWTExpiry
        }
    );
};

const authJwt = {
    verifyToken: verifyToken,
    createToken: createToken,
};

module.exports = authJwt;