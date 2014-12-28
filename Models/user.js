var mongoose = require('mongoose'),
				schema = mongoose.schema;
var userSchema = new schema({
		UserId : {type: string, required: true},
		UserEmail : {type: string},
		UserPh : {type: string}

});

var user = mongoose.model('User', userSchema);

module.exports = {User : user}; 