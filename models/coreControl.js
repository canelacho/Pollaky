var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coreControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  spaceInU: {type: String},
  observation: {type: String}
});

var CoreControls = mongoose.model("coreControls", coreControls_Schema);

module.exports.CoreControls = CoreControls;
