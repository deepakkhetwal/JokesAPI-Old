function mappings(app)
{
	var jokes = require('./routes/jokes');
	var feedbacks = require('./routes/feedback');
	var admnReview = require('./routes/admn/review');
	var video = require('./routes/video');
	//var jokesUpload = require('./routes/jokesUpload');
	
	app.get('/jokes', jokes.index);
	app.post('/jokes/create', jokes.create);
	app.delete('/jokes/delete', jokes.delete);
	app.put('/jokes/update', jokes.update);
	app.put('/jokes/createlike', jokes.createLike); 
	app.get('/admn/review', admnReview.index);
	app.put('/admn/review/update', admnReview.update);
	app.post('/feedbacks/create', feedbacks.create);
	//app.post('/upload', jokesUpload.upload);
	//app.get('/admin/visitor',)
	app.get('/jokes/mostliked', jokes.mostLiked);
	app.get('/video/create', video.create);
	app.get('/video', video.index);
	app.get('/video/review', video.getVideoForReview);
	app.put('/video/review/update', video.UpdateVideoAfterReview);

};

exports.mappings = mappings; 