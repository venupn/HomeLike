const User = require("../../model/userDetails");
const bcrypt = require('bcryptjs');
const createToken = require("../../authentication/createToken");

const loginUser = async (req, res) => {
    try {
        let loginDetails = new User(req.body);    // Get user input
        // Validate user input
        if (!(loginDetails.email && loginDetails.password)) {
            res.status(400).send({ success: false, error: "All input is required" });
        }
        const user = await User.findOne({ email: loginDetails.email });     // Validate if user exist in our database
        if (user && (await bcrypt.compare(loginDetails.password, user.password))) {
            user.token = createToken(user);       // save user token
            res.status(200).json({
                success: true,
                message: "Login Successful!!!",
                data: {
                    Name: user.firstName + user.lastName,
                    Email: user.email,
                    Token:  user.token
            } });
        }
        res.status(402).send({ success: false, data: "Invalid Credentials" });
    } catch (err) {
        return res.status(401).send({success:false, error: err });
    }
}
module.exports = loginUser;