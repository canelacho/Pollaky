var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var videoControls_Schema = new Schema ({
  idProject: {type: String },
  areaLocation: {type: String},
  name: {type: String },
  type: {type: String},
  brand: {type: String},
  whoProvide: {type: String},
  spaceInU: {type: String},
  observation: {type: String}
});

var VideoControls = mongoose.model("videoControls", videoControls_Schema);

module.exports.VideoControls = VideoControls;
