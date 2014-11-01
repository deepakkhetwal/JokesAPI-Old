var jokesBLL = {
	
    getMostLiked: function() {

    },
    getJokes : function(jokeEntity1){
    	
    	var jokeEntity = require('../Models/jokeEntity').Joke;
    	jokeEntity.find({is_reviewed: true}, function(err, docs){
    		return {message: "hello"};
		if(!err){ return {jokes: docs};}
		else{ return {message: err};}
	}) ; 
    	//jokeEntity.find({is_reviewed: true}, function(err, docs){
		//if(!err){ return {message: "Hello"};}
		//else{ return {message: err};}
	//}) ; 
    },
    createJokes : function(){},
    updateJokes : function(){},
    deleteJokes : function(){},
    createLike : function(){}

  
};

exports.jokesBLL = jokesBLL;