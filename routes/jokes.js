var jokeEntity = require('../Models/jokeEntity').Joke;

var jokesBLL = require('../bll/jokes').jokesBLL;
exports.index = function(req,res)
{
	//res.json(200, {Message: req.ip}); 
	//res.json(200, jokesBLL.getJokes(jokeEntity));
	var visitorEntity = require('../Models/visitorEntity').Visitor;
	var newVisitor = new visitorEntity();
	newVisitor.ip_address = req.ip;
	newVisitor.save();
	//jokeEntity.find({is_reviewed: true}, function(err, docs){
	//	if(!err){ res.json(200, {jokes: docs});}
	//	else{ res.json(500, {message: err});}
	//}) ; 

	jokeEntity.aggregate( 
	  [ 
	  	{$project : {
	  		_id : 1,
	  		description : 1,
	  		is_reviewed : 1,
	  		likes : { $cond : [ { $eq : [ "$likes", [] ] }, [ { value : null } ], '$likes' ] } 

	  	}},
	    { $unwind : "$likes" }, 
	    {$match : {is_reviewed:true}} ,
	    { $group : {
	     	_id: { _id: "$_id", description: "$description" },
	    	likesCount : { $sum : 1
	    	} } }, 
	   
	  ] , function(err, docs){
	  	if(!err){ res.json(200, {jokes: docs});}
		else{ res.json(500, {message: err});}
	  }
	); 
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

exports.createLike = function(req, res)
{
	var id = req.body.id;
	var is_liked = req.body.is_liked;
	jokeEntity.findById(id, function(err, doc){
		if(!err && doc){
			doc.likes.push({is_liked : is_liked});
			doc.save(function(err)
			{
				if(!err){res.json(200, {message: "Updated successfully"});}
				else{res.json(500, {message: "OOps some error occurred. Please try again later"});}
			});
		}
	});
}


exports.mostLiked = function(req, res)
{
	jokeEntity.aggregate( 
	  [ 
	    { $unwind : "$likes" }, 
	    { $group : {
	      _id : { _id: "$_id", description: "$description" },
	     likesCount : { $sum : 1 } } },
	    { $sort : { likesCount : -1 } }, 
	    { $limit : 10 }
	  ] , function(err, docs){
	  	if(!err){ res.json(200, {jokes: docs});}
		else{ res.json(500, {message: err});}
	  }
	);
}