var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var feedbackSchema = new schema({
    description : { type: String, required: 'feedback is required'}
  , user_email : {type: String}
  , contact_no : {type: String}
  , date_created : { type: Date, required: true, default: Date.now}

});

var feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = {Feedback: feedback};
