var mongoose = require('mongoose'),
	schema = mongoose.Schema;
var videoSchema = new schema({
		file_id : {type: String, required: true},
		extension : {type: String, required: true},
		file_loc: {type: String, required:true},
		title: {type: String},
		description : {type: String},
		tags: {type: String},
		is_reviewed : {type:Boolean, default: false},
   		date_created : { type: Date, required: true, default: Date.now}
});
var video = mongoose.model('video', videoSchema);
module.exports = {Video : video};

