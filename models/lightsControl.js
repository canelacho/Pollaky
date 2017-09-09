var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lightsControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  class: {type: String},
  whoProvide: {type: String},
  wallOrientation: {type: String},
  qtyBulbs: {type: Number},
  typeLightBulbs: {type: String},
  loadEachBulb: {type: Number},
  observation: {type: String}
});

var LightsControls = mongoose.model("lightsControls", lightsControls_Schema);

module.exports.LightsControls = LightsControls;
