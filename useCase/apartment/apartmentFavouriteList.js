const User = require("../../model/userDetails");
const jwt = require("jsonwebtoken");
const config = process.env;

const listfavouriteApartment = async (req, res) => {
    try {
       //userId can be passed as parameter or can be retrieved from token using below statements
       const token = req.body.token || req.query.token || req.headers["x-access-token"];
       const decoded = jwt.verify(token, config.TOKEN_KEY);
       var userId = decoded.userId;
      
      let listApartment = await User.findById({ _id: userId },
        { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, favouriteUser: 0, user: 0, password: 0, apartments: 0 }).lean().populate('favouriteApartment', 'address city country zipcode room' )
      return res.status(200).json({ success: true, data: listApartment });
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
}
module.exports = listfavouriteApartment;