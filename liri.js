var commands = process.argv[2];
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

//* `do-what-it-says`
if (commands === 'my-tweets'){
	var twitter = require("twitter");
	//get the twitter API keys from the keys.js file
	var keys = require("./keys.js");
	var client = new twitter(keys.twitterKeys);

//return all the API info for the previous 20 tweets
client.get('statuses/user_timeline', { count: 20 }, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    } else {
      console.log(error)
    }
});
}

if(commands === 'spotify-this-song'){
 	var spotify = require("spotify");
	var song = process.argv[3];


}

if(commands === 'movie-this'){
	var request = require("request");
	var movie = process.argv[3];

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {

  		// If the request is successful (i.e. if the response status code is 200)
  		if (!error && response.statusCode === 200) {

    		// Parse the body of the site and recover just the imdbRating
    		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    		console.log(JSON.parse(body).t);
    		console.log(JSON.parse(body).y);
   			console.log(JSON.parse(body).imdbRating);
    		console.log(JSON.parse(body).country.lang.plot.actors);
  		}
	});
}

if(commands === `do-what-it-says`){

	var fs = require("fs");
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
			console.log(data);
  	  var dataArr = data.split(",");
		console.log(dataArr[1]);
	});
}


