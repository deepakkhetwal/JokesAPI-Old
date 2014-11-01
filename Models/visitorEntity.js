var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var visitorSchema = new schema({
    ip_address : { type: String}
  , date_created : { type: Date, required: true, default: Date.now}
  });

var visitor = mongoose.model('Visitor', visitorSchema);
module.exports = {Visitor: visitor};
