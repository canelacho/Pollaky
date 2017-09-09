var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applianceControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  wallOrientation: {type: String},
  whoProvide: {type: String},
  observation: {type: String}
});

var ApplianceControls = mongoose.model("applianceControls", applianceControls_Schema);

module.exports.ApplianceControls = ApplianceControls;
