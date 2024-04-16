const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    size: String,
    forChildren: String,
    photo: { type: Buffer, contentType: String },
    PreferredDate : Date,
    NumerofClother : String,
    Address : String,
    Coordinates : String,
    Status : Number
});

const profileSchema = new mongoose.Schema({
    uid: String,
    name: String,
    email: String,
    donations: [donationSchema],
    otp: String,
    password : String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
