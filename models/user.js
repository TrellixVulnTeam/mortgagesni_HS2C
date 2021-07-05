var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  accConfirmed: Boolean,
  accConfirmedCode: String,
  passwordResetToken: String,
  passwordResetTime: Date
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);