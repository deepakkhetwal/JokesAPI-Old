var feedbackEntity = require('../Models/feedbackEntity').Feedback;
exports.index = function(req,res)
{
	//res.json(200, {Message: "hello"});
	
	feedbackEntity.find({}, function(err, docs){
		if(!err){ res.json(200, {feedbacks: docs});}
		else{ res.json(500, {message: err});}
	}) ; 
} 

exports.create = function(req, res)
{
	
	var newFeedback = new feedbackEntity();
	newFeedback.description = req.body.description;
	newFeedback.user_email = req.body.user_email;
	newFeedback.contact_no = req.body.contact_no;
	newFeedback.save(function(err)
	{
		if(!err)
			{
				res.json(201, {message: "SUCCESS"});
			}
		else{
			res.json(500, {message: req.body.description + req.body.user_email + req.body.contact_no});
		}
	}
	);
}


