//use terminal command line to run commands
var commands = process.argv[2];

// * `my-tweets`
var twitter = require("twitter");
// * `spotify-this-song`
var spotify = require("spotify");
// * `movie-this`
var request = require("request");
//* `do-what-it-says`
var fs = require("fs");

if (commands === 'my-tweets'){
	
	//get the twitter API keys from the keys.js file
	var keys = require("./keys.js");
	var client = new twitter(keys.twitterKeys);

//return all the API info for the previous 20 tweets
client.get('statuses/user_timeline', { count: 20 }, function(error, tweets, response) {
    if (!error) {
      console.log((tweets));
      //console.log(--------------);
    } else {
      console.log(error)
    }
});
}

if(commands === 'spotify-this-song'){
 	
  var song = process.argv[3];

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( !err ) {
    	console.log(JSON.stringify(data).parse(data).tracks);
    } else {
        console.log('Error occurred: ' + err);
    }
});

}

if(commands === 'movie-this'){
	
	var movie = process.argv[3];
		if(movie === ""){
  			movie = "Mr. Nobody";
  		}
	var movieTitle = movie.split(' ').join('+');

	var rtUrl = movie.split(' ').join('_');
	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json", function(error, response, body) {

  		// If the request is successful (i.e. if the response status code is 200)
  		if (!error && response.statusCode === 200) {

    		// Parse the body of the site and recover just the imdbRating
    		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    		console.log(JSON.parse(body).Title);
    		console.log(JSON.parse(body).Year);
   			console.log(JSON.parse(body).imdbRating);
   			console.log(JSON.parse(body).Country);
   			console.log(JSON.parse(body).Language);
    		console.log(JSON.parse(body).Plot);
  			console.log(JSON.parse(body).Actors);
  			console.log(JSON.parse(body).Ratings[1].Value);
  			console.log('https://www.rottentomatoes.com/m/' + rtUrl + '/');
  		}
	 });
}

if(commands === `do-what-it-says`){

	
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
			console.log(data);
  	  var dataArr = data.split(",");

	spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
    	if ( !err ) {
    		console.log(JSON.stringify(data));
    	} else {
        	console.log('Error occurred: ' + err);
    	}
	});
	});
}


