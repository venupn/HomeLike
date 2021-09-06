const User = require("../../model/userDetails");
const bcrypt = require('bcryptjs');
const createToken = require("../../authentication/createToken");

const loginUser = async (req, res) => {
    try {
        let loginDetails = new User(req.body);    // Get user input
        // Validate user input
        if (!(loginDetails.email && loginDetails.password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email: loginDetails.email });     // Validate if user exist in our database
        if (user && (await bcrypt.compare(loginDetails.password, user.password))) {
            user.token = createToken(user);       // save user token
            res.status(200).json({ success: true, data: user });
        }
        res.status(400).send({ success: false, data: "Invalid Credentials" });
    } catch (err) {
        console.log(err);
    }
}
module.exports = loginUser;