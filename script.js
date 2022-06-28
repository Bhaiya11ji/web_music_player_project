let track_list = [
    {
        name: "Matkar Maya Ko Ahankar",
        artist: "Unknown",
        image: "NA",
        path: "./tracks/Matkar Maya Ko Ahankar.mp3"
    },
    {
        name: "Sojugada Sooju Mallige Hindi Version With Lyrics  Lord Shiva Song  Vedic Vocals",
        artist: "Unknown",
        image: "NA",
        path: "./tracks/Sojugada Sooju Mallige Hindi Version With Lyrics  Lord Shiva Song  Vedic Vocals.mp3"
    },
    {
        name: "With Indias First Handpan Player  Deepak Chamoli  Baba Kutani",
        artist: "Unknown",
        image: "NA",
        path: "./tracks/With Indias First Handpan Player  Deepak Chamoli  Baba Kutani.mp3",
    },
];


// import { track_list } from "./trackList";
let trackName = document.querySelector(".trackName");
let trackArt = document.querySelector(".trackArt");
let trackArtist = document.querySelector(".trackArtist");

let preTrackBtn = document.getElementById("prevTrack");
let playPauseBtn = document.getElementById("playPause");
let nextTrackBtn = document.getElementById("nextTrack");

let currentTime = document.querySelector(".currentTime");
let slider = document.querySelector("#slider");
let trackDuration = document.querySelector(".trackDuration");

let stopStartRGB = document.getElementById("stopStartRGB");


let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement('audio');


function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = `rgb(${red}, ${green}, ${blue})`; 
    let forPlayerBg = `rgb(${red - 30}, ${green - 25},${blue + 10})`;
    // Set the background to the new color
    document.body.style.background = bgColor;
    document.querySelector(".player").style.backgroundColor = forPlayerBg;
}
setInterval(random_bg_color, 500);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    // load new track
    currentTrack.src = track_list[track_index].path;
    currentTrack.load();

    // udpate details of track 
    if (track_list[track_index].image == "NA") {
        trackArt.style.background = "url(./images/player_icon.png)";
    }
    else {
        trackArt.style.backgroundColor = `url(${track_list[track_index].image})`;
    }
    trackArtist.textContent = track_list[track_index].artist;
    trackName.textContent = track_list[track_index].name;

    // update the track slider 1000 ms

    updateTimer = setInterval(sliderUpdate, 1000);

    // add event lister to song 
    currentTrack.addEventListener("ended", playNextTrack);
}

// reset values  function 

function resetValues() {
    currentTime.textContent = "00:00";
    trackDuration.textContent = "00:00";
    slider.value = 0;
}

function playPauseTrack() {
    // switch the play pause iconod and change the condition of song
    if (!isPlaying) {
        playTrack();
    }
    else {
        pauseTrack();
    }
}

function playTrack() {
    currentTrack.play();
    playPause.innerHTML = '<i class="fa fa-pause-circle"></i>';
    isPlaying = true;
}
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPause.innerHTML = '<i class="fa fa-play-circle"></i>';
}
function playNextTrack() {
    if (trackIndex < (track_list.length - 1)) {
        trackIndex++;
    }
    else trackIndex = 0;

    loadTrack(trackIndex);
    playTrack();
}
function playPrevTrack() {
    if (trackIndex > 0) {
        trackIndex -= 1;
    }
    else {
        trackIndex = track_list.length - 1;
    }

    loadTrack(trackIndex);
    playTrack();
}



function seekTo() {
    // get the value of slider as percentage and multiply to duration

    seekToValue = currentTrack.duration * (slider.value / 100);
    currentTrack.currentTime = seekToValue;
}

function sliderUpdate() {
    let sliderPosition = 0;
    if (!isNaN(currentTrack.duration)) {
        sliderPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        slider.value = sliderPosition;

        // now change the currrent tiem and total duratio values 

        currentMinutes = Math.floor(currentTrack.currentTime / 60);
        currentSeconds = Math.floor(currentTrack.currentTime - (currentMinutes * 60));
        durationMinutes = Math.floor(currentTrack.duration / 60);
        durationSeconds = Math.floor(currentTrack.duration - (durationMinutes * 60));
    }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes };
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds };
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes };
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds };

    currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
    trackDuration.textContent = `${durationMinutes}:${durationSeconds}`;
}

loadTrack(trackIndex);