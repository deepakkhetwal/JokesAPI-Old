function mappings(app)
{
	var jokes = require('./routes/jokes');
	var feedbacks = require('./routes/feedback');
	var admnReview = require('./routes/admn/review');
	var jokesUpload = require('./routes/jokesUpload');
	app.get('/jokes', jokes.index);
	app.post('/jokes/create', jokes.create);
	app.delete('/jokes/delete', jokes.delete);
	app.put('/jokes/update', jokes.update);
	app.put('/jokes/createlike', jokes.createLike); 
	app.get('/admn/review', admnReview.index);
	app.put('/admn/review/update', admnReview.update);

	app.post('/feedbacks/create', feedbacks.create);
	app.post('/uploadjokesimage', jokesUpload.uploadJokesImage);
	app.get('/download/:name', jokesUpload.downloadJokes);
	
};

exports.mappings = mappings;