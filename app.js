require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
app.use(express.json());

const auth = require("./authentication/auth");
//import module
const userRegistration = require("./useCase/user/userRegistration");
const loginUser = require("./useCase/user/userLogin");
const createApartment = require("./useCase/apartment/apartmentCreation");
const filterApartment = require("./useCase/apartment/apartmentfilter");
const filterApartmentBasedOnZipCode = require("./useCase/apartment/apartmentFilterBasedOnZipCode");
const favouriteApartment = require("./useCase/apartment/apartmentFavourite");

//routing
app.post("/userRegistration", userRegistration);// Register User
app.post("/userLogin",loginUser);// User Login
app.post("/apartmentCreation", auth, createApartment);// apartment creation
app.get("/apartmentFilter", auth, filterApartment);// apartment filter
app.post("/apartmentFilterBasedOnZipCode", auth, filterApartmentBasedOnZipCode);// apartment filter Based On ZipCode
app.post("/apartmentFavourite", auth, favouriteApartment);// apartment Favourite

module.exports = app;