var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var audioControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  spaceInU: {type: String},
  observation: {type: String}
});

var AudioControls = mongoose.model("audioControls", audioControls_Schema);

module.exports.AudioControls = AudioControls;
