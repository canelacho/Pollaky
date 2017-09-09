var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var irrigationControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  observation: {type: String}
});

var IrrigationControls = mongoose.model("irrigationControls", irrigationControls_Schema);

module.exports.IrrigationControls = IrrigationControls;
