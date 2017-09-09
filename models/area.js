var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var areas_Schema = new Schema ({
							        projectAsociate: {type: String},
							        name: {type: String }
});

var Area = mongoose.model("Area", areas_Schema);

module.exports.Area = Area;