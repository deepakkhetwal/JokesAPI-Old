var jokeEntity = require('../Models/jokeEntity').Joke;
exports.index = function(req,res)
{
	//res.json(200, {Message: "hello"});
	
	jokeEntity.find({is_reviewed: true}, function(err, docs){
		if(!err){ res.json(200, {jokes: docs});}
		else{ res.json(500, {message: err});}
	}) ; 
} 

exports.create = function(req, res)
{
	
	var newJoke = new jokeEntity();
	newJoke.description = req.body.Description;
	newJoke.joke_category = req.body.joke_category;
	newJoke.user_email = req.body.user_email;
	newJoke.save(function(err)
	{
		if(!err)
			{
				res.json(201, {message: "Your Joke has been saved successfully"});
			}
		else{
			res.json(500, {message: "OOps some error occurred. Please try again later"});
		}
	}
	);
}

exports.delete = function(req, res)
{
	
	var id  = req.body.id;
	jokeEntity.findById(id, function(err, doc){
		if(!err && doc){
			doc.remove();
			res.json(200, {message: "Joke deleted successfully"});
		}
		else
		{
			res.json(500, {message : "OOps some error occurred. Please try again later"});
		}
	});
}

exports.update = function(req, res)
{
	
	var id = req.body.id;
	var description = req.body.description;
	jokeEntity.findById(id, function(err, doc){
		if(!err && doc){
			doc.description = description;
			doc.save(function(err){
				if(!err){res.json(200, {message: "Updated successfully"});}
				else{res.json(500, {message: "OOps some error occurred. Please try again later"});}
			});
		}
	});

}
