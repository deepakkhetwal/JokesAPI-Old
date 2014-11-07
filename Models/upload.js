var mongoose = require('mongoose'),
				schema = mongoose.schema;
var uploadSchema = new schema({
		file_id : {type: string, required: true},
		extension : {type: string, required: true},
		title: {type: string},
		description : {type: string},
		tags: {type: string},
		is_reviewed : {type:Boolean, default: false},
   		date_created : { type: Date, required: true, default: Date.now}
		

});
var upload = mongoose.model('Upload', uploadSchema);
module.exports = {Upload : upload};

