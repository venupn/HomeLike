const User = require("../../model/userDetails");
const bcrypt = require('bcryptjs');
const createToken = require("../../authentication/createToken");

const registerUser = async (req, res) => {
    try {
      const user = new User(req.body); // Get user input  
      if (!(user.email && user.password && user.firstName && user.lastName)) {       // Validate user input
        res.status(400).send({success:false, error: "All input is required" });
      }
      const oldUser = await User.findOne({ email: user.email });      // check if user already exist
      if (oldUser) {
        return res.status(409).send({success:false, error: "User Already Exist. Please Login" });
      }
      user.password = await bcrypt.hash(user.password, 10);      //Encrypt user password
      await user.save();      //Save user details to Database
      res.status(200).json({
        success: true,
        message: "User created successfully!!!",
        data: {
          Name: user.firstName + user.lastName,
          Email: user.email
        }
      });      // return new user
    } catch (err) {
      return res.status(404).json({success:false, error: err });
    }
}
module.exports = registerUser;