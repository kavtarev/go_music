const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playButton = document.getElementById('playButton');
// const stopButton = document.getElementById('stopButton');
const showButton = document.getElementById('showButton');
console.log(9090909);

const playlist = ["./notes/G.mp3", "./notes/GS.mp3"];

let interval;
let index;

playButton.addEventListener('click', function () {
  let track = pickTrack(playlist)
  // alert(track)
  audioSource.src = track
  audioPlayer.load();
  audioPlayer.play();
  interval = setInterval(() => {
    audioPlayer.play();
  });
}, 1000)

showButton.addEventListener('click', () => {
  clearInterval(interval)
  alert(index)
})

function pickTrack(arr) {
  index = Math.floor(Math.random() * (arr.length))
  return playlist[index]
}