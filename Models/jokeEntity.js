var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var jokeSchema = new schema({
    description : { type: String, required: 'Joke description is required'}
  , user_email : {type: String}
  , joke_category : {type: String}
  , is_reviewed : {type:Boolean, default: false}
  , date_created : { type: Date, required: true, default: Date.now}

});

var joke = mongoose.model('Joke', jokeSchema);
module.exports = {Joke: joke};
