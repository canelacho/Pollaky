var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var poolControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  chargeWats: {type: String},
  observation: {type: String}
});

var PoolControls = mongoose.model("poolControls", poolControls_Schema);

module.exports.PoolControls = PoolControls;
