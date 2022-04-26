let trackName = document.getElementById("track-name");
let prevTrackBtn = document.getElementById("prevTrack-btn");
let nextTrackBtn = document.getElementById("nextTrack-btn");
let playBtn = document.getElementById("play-btn");
let pauseBtn = document.getElementById("pause-btn");
let currentTime = document.getElementById("current-time");
let totalTime = document.getElementById("total-time");
let timeSlider = document.getElementById("time-slider");

let track_index = 0;
let isPlaying = false;
let updateTimer = 0;

let curr_track = document.createElement("audio");

let trackList = [
  {
    name: "Both Of Us",
    path: "./music/both-of-us.mp3",
  },
  {
    name: "Electronic Rock",
    path: "./music/electronic-rock-king-around-here.mp3",
  },
  {
    name: "EveryThing Feels New",
    path: "./music/everything-feels-new.mp3",
  },
  {
    name: "Intro the Night",
    path: "./music/into-the-night.mp3",
  },
  {
    name: "Water Fluid",
    path: "./music/watr-fluid.mp3",
  },
];

function togglePlayPause() {
  playBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");

  if (isPlaying) {
    curr_track.pause();
    isPlaying = false;
  } else {
    curr_track.play();
    isPlaying = true;
  }
}

function resetValues() {
  currentTime.innerText = "00:00";
  totalTime.innerText = "00:00";
  timeSlider.value = "0";
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = trackList[track_index].path;
  curr_track.load();

  trackName.innerText = trackList[track_index].name;

  if (isPlaying) {
    curr_track.play()
  } else {
    curr_track.pause()
  }

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function nextTrack() {
  if (track_index < trackList.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }

  loadTrack(track_index);
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = trackList.length - 1;

  loadTrack(track_index);
}

function seekTo() {
  let seekto = curr_track.duration * (timeSlider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    timeSlider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.innerText = currentMinutes + ":" + currentSeconds;
    totalTime.innerText = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
