const User = require("../../model/userDetails");
const Apartment = require("../../model/apartmentDetails");
const jwt = require("jsonwebtoken");
const config = process.env;

const savefavouriteApartment = async (req, res) => {
  try {
    // Validate user input
    if (!(req.body.apartmentId)) {
      res.status(400).send({ success: false, error: "All input is required" });
    }

    //userId can be passed as parameter or can be retrieved from token using below statements
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    var userId = decoded.userId;
    let user = await User.findById({ _id: userId });

    let apartment = await Apartment.findById({ _id: req.body.apartmentId });
    apartment.favouriteUser = user._id;

    // Save favouriteUser in apartment
    await apartment.save();

    // Save favourite apartment in User
    user.favouriteApartment.push(apartment);
    await user.save();

    // return list of favourite apartment
    res.status(200).json({
      success: true, data: await User.findById({ _id: userId },
        { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, favouriteUser: 0, user: 0, password: 0, apartments: 0 }).lean().populate('favouriteApartment', 'address city country zipcode room' )
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = savefavouriteApartment;