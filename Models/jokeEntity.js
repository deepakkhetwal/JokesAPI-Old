var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var jokeSchema = new schema({
    description : { type: String, required: true }
  , date_created : { type: Date, required: true, default: Date.now
}
});

var joke = mongoose.model('Joke', jokeSchema);
module.exports = {Joke: joke};
