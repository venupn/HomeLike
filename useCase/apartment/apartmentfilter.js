const Apartment = require("../../model/apartmentDetails");

const filterApartment = async (req, res) => {
    try { 
      // return new apartment
      res.status(201).json({ success: true, data: await Apartment.find({ $or: [{ city: req.body.city || true }, { country: (req.body.country || true) }, { room: (req.body.room || true) }] }).populate('user') });
    } catch (err) {
      console.log(err);
    }
  }
module.exports = filterApartment;