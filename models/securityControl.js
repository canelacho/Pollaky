var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var securityControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  observation: {type: String}
});

var SecurityControls = mongoose.model("securityControls", securityControls_Schema);

module.exports.SecurityControls = SecurityControls;
