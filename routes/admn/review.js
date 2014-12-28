var jokeEntity = require('../../Models/jokeEntity').Joke;
exports.index = function(req, res)
{
	jokeEntity.find({}, function(err, docs){
		if(!err){ res.json(200, {jokes: docs});}
		else{ res.json(500, {message: err});}
	}) ; 
}

exports.update = function(req, res)
{
	var id = req.body.id;
	var description = req.body.description;
	var jokeCategory = req.body.jokeCategory;
	var isReviewed = req.body.isReviewed;
	var userEmail = req.body.userEmail;
	jokeEntity.findById(id, function(err, doc){
		if(!err && doc){
			doc.description = description;
			doc.joke_category = jokeCategory;
			doc.is_reviewed = isReviewed;
			doc.user_email = userEmail;
			doc.save(function(err){
				if(!err){res.json(200,{message : "Updated successfully"})}
				else{res.json(500, {message: "OOps some error occurred. Please try again later"})}

			});} 
		}
	); 
	
}