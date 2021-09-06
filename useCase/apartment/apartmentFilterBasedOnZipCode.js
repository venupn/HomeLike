const axios = require('axios');
const config = process.env
const Apartment = require("../../model/apartmentDetails");

const filterApartmentBasedOnZipCode = async (req, res) => {
    const zipCodeUri = `${config.ZIPCODE_URI}/${req.body.zipCode}/${req.body.distance}/${req.body.units}`;
      await axios.get(zipCodeUri)
          .then(async response => {
            let zipCodes = response.data.zip_codes;
            let apartment = await Apartment.find().exec();
              let details = apartment.filter(item => zipCodes.some(data => data.zip_code === item.zipcode));
              res.status(201).json({ success: true, data: details })
        })
        .catch(error => {
          console.log(error);
        });
}

module.exports = filterApartmentBasedOnZipCode;

