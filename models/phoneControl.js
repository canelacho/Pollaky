var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var phoneControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  observation: {type: String}
});

var PhoneControls = mongoose.model("phoneControls", phoneControls_Schema);

module.exports.PhoneControls = PhoneControls;
