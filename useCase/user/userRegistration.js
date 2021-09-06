const User = require("../../model/userDetails");
const bcrypt = require('bcryptjs');
const createToken = require("../../authentication/createToken");

const registerUser = async (req, res) => {
    try {
      const user = new User(req.body); // Get user input  
      if (!(user.email && user.password && user.firstName && user.lastName)) {       // Validate user input
        res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({ email: user.email });      // check if user already exist
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      user.password = await bcrypt.hash(user.password, 10);      //Encrypt user password
      await user.save();      //Save user details to Database
      user.token = createToken(user);      // save user token  
      res.status(201).json({success:true, data: user });      // return new user
    } catch (err) {
      console.log(err);
    }
}
module.exports = registerUser;