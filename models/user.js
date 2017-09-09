var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/Pollaky");

var user_Schema = new Schema({
								username:{type: String, required: true, minlenght:[1,"Short User "],maxlenght:[20,"Long User"]},
								password:{type: String, required: true, minlenght:[1,"Short User "],maxlenght:[20,"Long User"]},
								type:{type: String, required: true},
								dateCreation: {type: Date, default: Date.now}
});

var User = mongoose.model("User", user_Schema);

module.exports.User = User;
