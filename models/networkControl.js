var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var networkControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  spaceInU: {type: String},
  observation: {type: String}
});

var NetworkControls = mongoose.model("networkControls", networkControls_Schema);

module.exports.NetworkControls = NetworkControls;
