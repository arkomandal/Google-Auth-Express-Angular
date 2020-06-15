const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    pic: String,
    email_verified: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);