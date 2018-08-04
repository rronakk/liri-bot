# liri-bot

Liri is a half brother of siri, who just can't speak, but understand your commands, and responds back.

He is half baked, and can only understand 4 commands for now.

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

let's do some setup to onboard Liri:

Demo : 
![](demo.gif)

### Setup

- cd into the project directory.
- Install the node packages required to fuel Liri:

```npm install```

### Executing Liri

Let me explaing what does Liri knows till now , and how to make him do the work.

* ```my-tweets```

    `node liri.js my-tweets`
    - Liri will show your last 20 tweets and when they were created at in your terminal/bash window.
* ```spotify-this-song```

    `node liri.js spotify-this-song '<song name here>'`

    -  Liri will show the following information about the song in your terminal/bash window
     
        * Artist(s)
     
        * The song's name
     
        * A preview link of the song from Spotify
     
        * The album that the song is from
* ```movie-this```

    `node liri.js movie-this '<movie name here>'`
    - Liri will show following information about the movie
         * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
* ```do-what-it-says```

    `node liri.js do-what-it-says`
    - Whatever text exist in random.txt , liri will try to execute it.

