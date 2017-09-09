var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var survillanceControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  resolution: {type: String},
  poe:{type: Boolean},
  observation: {type: String}
});

var SurvillanceControls = mongoose.model("survillanceControls", survillanceControls_Schema);

module.exports.SurvillanceControls = SurvillanceControls;
