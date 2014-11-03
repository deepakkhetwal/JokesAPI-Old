var visitorEntity = require('../Models/visitorEntity').Visitor;

var jokesBLL = require('../bll/jokes').jokesBLL;
exports.index = function(req,res)
{
	
	visitorEntity.find({}, function(err, docs){
		if(!err){ res.json(200, {visitor: docs});}
		else{ res.json(500, {message: err});}
	}) ;  
} 