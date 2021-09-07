const Apartment = require("../../model/apartmentDetails");

const filterApartment = async (req, res) => {
  try {
    // list all apartment OR filter apartment
    // let apartmentList = await Apartment.find({ $or: [{ city: req.body.city || true }, { country: (req.body.country || true) }, { room: (req.body.room || true) }] },
    //   { __v: 0, createdAt: 0, updatedAt: 0, favouriteUser: 0,user:0 });
    let apartment = await Apartment.find({}, { __v: 0, createdAt: 0, updatedAt: 0, favouriteUser: 0 }).lean().populate('user', 'firstName lastName email');

    apartment = apartment.filter(item =>
    ((((item.city === req.body.city) ||
      (item.country === req.body.country) ||
      (item.room === req.body.room))))
    );

    res.status(200).json({
      success: true,
      data: apartment
    });
  } catch (err) {
    return res.status(404).send({ success: false, error: err });
  }
}
module.exports = filterApartment;