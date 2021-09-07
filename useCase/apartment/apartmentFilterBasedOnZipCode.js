const axios = require('axios');
const config = process.env
const Apartment = require("../../model/apartmentDetails");

const filterApartmentBasedOnZipCode = async (req, res) => {
    const zipCodeUri = `${config.ZIPCODE_URI}/${req.body.zipCode}/${req.body.distance}/${req.body.units}`;
      await axios.get(zipCodeUri)
          .then(async response => {
            let zipCodes = response.data.zip_codes;
              let apartmentList = await Apartment.find({},{ __v: 0, createdAt: 0, updatedAt: 0, favouriteUser: 0,user:0 }).exec();
              let apartment = apartmentList.filter(item => zipCodes.some(data => data.zip_code === item.zipcode));
              res.status(200).json({ success: true, data: apartment})
        }) 
        .catch(err => {
          return res.status(401).json({ success: false, error: err.message });
        });
}

module.exports = filterApartmentBasedOnZipCode;

