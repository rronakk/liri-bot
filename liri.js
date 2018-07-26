require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv.length > 2){
    goLiri(process.argv[2], process.argv[3])
}
else{
    console.log("Please enter a command for liri to execute");
}

// main action happens here.
function goLiri(command, action){
    addToLog("\n Command :  " + command);
    addToLog("\n ********* Powering Up Liri *********** ");

    switch (command)
    {
        case "my-tweets": getTweets();
        break;

        case "spotify-this-song" :
        if (action){
            getSongInfo(action);
        }
        else{
            console.log("Please provide name of the song");
        }
        break;

        case "movie-this": 
        if (action){
            getMovieInfo(action);
        }
        else{
            console.log("You didnt specify movie name, But this is what I recommed you to watch : ");
            getMovieInfo("Mr. Nobody");
        }
        break;

        case "do-what-it-says":doAsSaid();
        break;

        default : console.log("liri do not understand your command");

    }
}


// twitter data for user
function getTweets(){
    var twitterParams = {screen_name: 'Michael16722904'};
    client.get('statuses/user_timeline', twitterParams, function(error, tweets) {
    if (!error) {
      for (var i = 0; i< tweets.length; i++){
        console.log("-----------");
        console.log("Created --->", tweets[i].created_at);
        console.log("Tweeted --->", tweets[i].text);

        addToLog("\n -----------");
        addToLog("\n Created --->" + tweets[i].created_at);
        addToLog("\n Tweeted --->" + tweets[i].text);

      }
    }
  });
}

//get spotify data
function getSongInfo(song){
    spotify
        .search({
            type: 'track',
            query: song,
        })
        .then(function (response) {
            console.log("Artist(s) -->", response.tracks.items[0].artists[0].name); 
            console.log("Song Name -->", response.tracks.items[0].name);
            console.log("Preview Link -->", response.tracks.items[0].preview_url);
            console.log("Album Name -->", response.tracks.items[0].album.name);
      
            addToLog("\n Artist(s) ---->" + response.tracks.items[0].artists[0].name);
            addToLog("\n Song Name ---->" + response.tracks.items[0].name);
            addToLog("\n Preview Link ---->" + response.tracks.items[0].preview_url);
            addToLog("\n Albumn ---->" + response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log("Didn't find the song you requested, but here is my favourite");
            getSongInfo("The Sign, Ace of base");
        });
}


//get movie data
function getMovieInfo(movieName){
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            console.log("Title of Movie ---> ", JSON.parse(body).Title);
            console.log("Year Released ---> ", JSON.parse(body).Released);
            console.log("IMDB Ratings ---> ", JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Ratings ---> ", JSON.parse(body).Ratings[1].Value);
            console.log("Country of production ---> ", JSON.parse(body).Country);
            console.log("Langauge released ---> ", JSON.parse(body).Language);
            console.log("Plot of the movie ---> ", JSON.parse(body).Plot);
            console.log("Lead Actors ---> ", JSON.parse(body).Actors);

            addToLog("\n Title of Movie ---> " + JSON.parse(body).Title);
            addToLog("\n Year Released ---> " + JSON.parse(body).Released);
            addToLog("\n IMDB Ratings ---> " + JSON.parse(body).imdbRating);
            addToLog("\n Rotten Tomatoes Ratings --->" + JSON.parse(body).Ratings[1].Value);
            addToLog("\n Country of production --->" + JSON.parse(body).Country);
            addToLog("\n Langauge released ---> " + JSON.parse(body).Language);
            addToLog("\n Plot of the movie ---> " + JSON.parse(body).Plot);
            addToLog("\n Lead Actors ---> " + JSON.parse(body).Actors);
        }
        else{
            console.log("Sorry, I dont know that movie");
        }
    });
    
}

//following cmd from txt file
function doAsSaid(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            console.log(err);
        }
        var output = data.split(",");
        goLiri(output[0], output[1])
    })
}

// to write into txt file
function addToLog(message){
    fs.appendFile("log.txt", message, function(err) {
        if (err) {
          return console.log(err);
        }});
}
