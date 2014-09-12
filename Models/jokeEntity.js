var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var likeSchema = new schema({
	is_liked : {type:Boolean}

});

var commentSchema = new schema({
	comment_text : {type: String}
});


var jokeSchema = new schema({
    description : { type: String, required: 'Joke description is required'}
  , user_email : {type: String}
  , joke_category : {type: String}
  , is_reviewed : {type:Boolean, default: false}
  , date_created : { type: Date, required: true, default: Date.now}
  , likes : [likeSchema]
  , comments : [commentSchema]
  
});


var joke = mongoose.model('Joke', jokeSchema);
module.exports = {Joke: joke};
