const jwt = require("jsonwebtoken");
const config = process.env;

// Create token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        config.TOKEN_KEY,
        {
            expiresIn: "2h"
        }
    );
}
  
module.exports = generateToken;