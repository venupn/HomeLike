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
      req.body.user = user._id;
      let apartment = new Apartment(req.body);
      // Validate user input
      if (!(apartment.address && apartment.zipcode && apartment.city && apartment.country)) {
        res.status(400).send({ success: false, error: "All input is required" });
      }
      // Save apartment Details
      await apartment.save();
      user.apartments.push(apartment);
      await user.save();

      // return new apartment
      res.status(200).json({
        success: true,
        message: "Apartment creation Successful!!!",
        data: {
          Address: apartment.address,
          Zipcode: apartment.zipcode,
          City: apartment.city, 
          Country: apartment.country,
          Room: apartment.room
        } 
      });
    } catch (err) {
      return res.status(404).send({success:false, error: err.message });
    }
  }
module.exports = createApartment;