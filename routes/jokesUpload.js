exports.uploadJokesImage = function(req,res)
{
	//res.json(200, {Message: "hello"});
	var mongoose = require('mongoose');
	var Grid = require('gridfs-stream');
    var fs = require('fs');
    var bb = require('busboy');
	var conn = mongoose.createConnection(require('../appConfig').connectionString);
	conn.once('open', function () {
	  var gfs = Grid(conn.db, mongoose.mongo);
	  var busboy = new bb({ headers: req.headers });

	   busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
	       // Stream file here
	       var store = gfs.createWriteStream({filename: filename, content_type: mimetype});
		    file.pipe(store);
		    store.on("close", function(file) {
		       // Do something with file.fileId or even file.filename
		    });
	   });

	   busboy.on("finish", function() {
	      res.json(200, "Success!");
	   });

   		req.pipe(busboy);
		  // all set!
		});
	
  	
} 
