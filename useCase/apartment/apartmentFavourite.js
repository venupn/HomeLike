const User = require("../../model/userDetails");
const Apartment = require("../../model/apartmentDetails");
const jwt = require("jsonwebtoken");
const config = process.env;

const createApartment = async (req, res) => {
    try {
      const token = req.body.token || req.query.token || req.headers["x-access-token"];
      const decoded = jwt.verify(token,config.TOKEN_KEY);
      var userId = decoded.userId;
      let user = await User.findById({ _id: userId });
      // Get apartment input
      req.body.favouriteUser = user._id;
      let apartment = new Apartment(req.body);
      // Validate user input
      if (!(apartment.address && apartment.zipcode && apartment.city && apartment.country)) {
        res.status(400).send("All input is required");
      }
      // Save apartment Details
      await apartment.save();
      user.apartments.push(apartment);
      await user.save();
      // return new apartment
      res.status(201).json({success:true, data: apartment });
    } catch (err) {
      console.log(err);
    }
  }
module.exports = createApartment;