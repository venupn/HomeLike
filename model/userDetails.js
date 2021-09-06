const mongoose = require("mongoose");
const { Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  apartments: [{
    type: Schema.Types.ObjectId,
    ref: 'apartment'
  }],
  favouriteApartment: [{
    type: Schema.Types.ObjectId,
    ref: 'apartment'
 }]
},{timestamps: true});

module.exports = mongoose.model("user", userSchema);
