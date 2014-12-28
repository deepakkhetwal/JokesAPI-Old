var videoEntity = require('../Models/videoEntity').Video;
var videoAdminDTO = require('../dto/video/video-admin-dto');
var awsSDK = require('aws-sdk');
exports.create = function(req,res)
{
	
  	var newVideo = new videoEntity();
	//newJoke.description = req.body.Description;
	newVideo.file_id = req.body.file_id;
	newVideo.extension = req.body.extension;
	newVideo.title = req.body.title;
	newVideo.description = req.body.description;
	newVideo.tags = req.body.tags;
	newVideo.is_reviewed = req.body.is_reviewed;

	newVideo.save(function(err)
	{
		if(!err)
			{
				res.json(201, {message: "Your video has been saved successfully"});
			}
		else{
			res.json(500, {message: "OOps some error occurred. Please try again later"});
		}
	}
	);
} ;

exports.index = function(req, res)
{
	

	videoEntity.find({}, function(err, docs){
		if(!err){ res.json(200, {videos: docs});}
		else{ res.json(500, {message: err});}
	}) ; 


};
exports.UpdateVideoAfterReview  = function(req, res)
{
	var fileId = req.body.file_id;
	var description = req.body.description;
	var title = req.body.title;
	var isReviewed = req.body.isReviewed;
	var tags = req.body.tags;

	videoEntity.findOne({file_id: fileId}, function(err, doc){
		if(!err && doc){
			doc.description = description;
			doc.tags = tags;
			doc.is_reviewed = isReviewed;
			doc.title = title;
			doc.save(function(err){
				if(!err){res.json(200,{message : "Updated successfully"})}
				else{res.json(500, {message: "OOps some error occurred. Please try again later"})}
 
			});
		}
	
		else
		{
			
				var newVideo = new videoEntity();
				//newJoke.description = req.body.Description;
				newVideo.file_id = fileId;
				newVideo.extension = "mp4";
				newVideo.title = title;
				newVideo.description = description;
				newVideo.tags = tags;
				newVideo.is_reviewed = isReviewed;
				newVideo.save(function(err)
				{
					if(!err)
						{
							res.json(200, {message: "Your video has been saved successfully"});
						}
					else{
						res.json(500, {message: err + "OOps some error occurred. Please try again later"});
					}
				});
			
		} 
		}); 
	
};
exports.getVideoForReview = function(req, res)
{
	// pull below access key from configuration later.
	awsSDK.config.update({accessKeyId: 'AKIAIPSTFLNA27I73CWQ', secretAccessKey: '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'});
	var s3 = new awsSDK.S3(); 
	var params = {
	  Bucket: 'elasticbeanstalk-us-west-2-780260980507' 
	 
	}; 
	s3.listObjects(params, function(err, data) {
	  if (err) 
	  {
	  	console.log(err, err.stack);
	  	//res.json(500, {message: "OOps some error occurred. Please try again later"});
	  	res.json(500, {message: "OOps some error occurred. Please try again later"}); 
	  } // an error occurred
	  else 
	  {

	  		videoEntity.find({}, function(err, docs){
			if(docs.length <=0 ) // if no records in database return all
			{

			  	var objVideoArr = [];
			  	var dto = null;
			  	var obj = null;
			  	for (var item in data.Contents) {
			  		dto = new videoAdminDTO();
			    	obj = data.Contents[item];
			  		dto.file_id = obj.Key;
			  		dto.title = null;
			  		dto.description = null;
			  		dto.tags = null;
			  		dto.is_reviewed = false;
			  		dto.extension = obj.Key.split('.')[1] ;
			  		dto.file_url = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-780260980507/' + dto.file_id ;
			  		objVideoArr.push(dto);


			    // ...
				}
				res.json(200, {message: objVideoArr });
			}
			else
			{
				var awsKey = null;
				var objVideoArr = [];
				var dto = null;
			  	var obj = null;
			  	var dbItemFound= null;
			  
				for(var awsItem in data.Contents)
				{
					dbItemFound = false;
					awsKey = data.Contents[awsItem].Key;
					for(var i = 0; i< docs.length ; i++)
					{
					    
						if(awsKey == docs[i].file_id)
						{

							
							dto = new videoAdminDTO();
					    	obj = data.Contents[awsItem];
					  		dto.file_id = obj.Key;
					  		dto.title = docs[i].title;
					  		dto.description = docs[i].description;
					  		dto.tags = docs[i].tags;
					  		dto.is_reviewed = docs[i].is_reviewed;
					  		dto.extension = obj.Key.split('.')[1] ;
			  				dto.file_url = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-780260980507/' + dto.file_id ;
					  		objVideoArr.push(dto);
					  		dbItemFound = true;

						}
					}
					if(dbItemFound == false)// aws has video but information is not been in database or not been reviewed by admin
					{
						
						dto = new videoAdminDTO();
					    obj = data.Contents[awsItem];
					  	dto.file_id = obj.Key;
					  	dto.title = "";
					  	dto.description = "";
					  	dto.tags ="";
					  	dto.is_reviewed = false;
					  	dto.extension = obj.Key.split('.')[1] ;
			  			dto.file_url = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-780260980507/' + dto.file_id ;
					  	objVideoArr.push(dto);
					  	
					} 

				}
				res.json(200, {message: objVideoArr });
			
				
			}
		}) ;  
	  	
	   	

	  }         // successful response
	});  
	
	//res.json(200, {message: "OOps some error occurred. Please try again later"});

};

//crud.js file
