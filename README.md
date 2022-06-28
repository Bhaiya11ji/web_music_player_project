# web_music_player_project
music player website using html, css and js

the song list is added in form of an array variable in script.js
you first need to add your song in list and track folder then you can listen it 

1. index.html file and style.css file contain the interface and nothing more.
2. js file contains most of the component like
     -- track list 
     -- handling the tracks
     -- handling the html events

---> How to add songs to use this web app <---
   
   1. save your song in track folder 
   2. if have any song cover then save it in image folder, if you dont then default image 'player_icon.png' will be used
   3. next open script.js file
   4. at the top in tracklist folder you will have something like - 
      let track_list = [
        {
            name: "track_1",
            artist: "Unknown",
            image: "./images/track_1.png",
            path: "./tracks/track_1.mp3"
        }
    ];
    so you just need to add a object entry here, just for the functioning you just need to specify only the path and image as "NA"
    for the artist and name you can use any value 
   5. so after adding the song just reload the web app and listen
 
 "yeah adding the song and other feature can we added, so yeah wait it will be updated"
