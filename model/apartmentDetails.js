const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    address: { type: String, default: null },
    zipcode: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    room: { type: Number, default: null },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    favouriteUser: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
     }]
}, { timestamps: true });

module.exports = mongoose.model("apartment", apartmentSchema);
