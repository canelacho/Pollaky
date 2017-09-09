var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var project_Schema = new Schema ({  
						            nameProject: {type: String, required: false},
						            respons: {type: String, required: false},
						            idRespons: {type: String, required: false},
						            address: {type: String, required: false},
						            country: {type: String, required: false},
						            state: {type: String, required: false},
						            city: {type: String, required: false},
						            contactPerson: {type: String, required: false},
						            phoneContactPerson: {type: String, required: false},
						            firstcontact: Date,
						            createdData: {type: Date, default: Date.now},
						            observation: {type: String, required: false},
						            activeStatus:{type: String, required: false},
						            avaliable: {type: Boolean},
						            qntDevices: {type: Number},
						            devices: []
});

var Project = mongoose.model("Project", project_Schema);

module.exports.Project = Project;