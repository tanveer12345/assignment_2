const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({});

userSchema.plugin(passportLocalMongoose);

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
