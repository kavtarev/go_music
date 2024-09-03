const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playButton = document.getElementById('playButton');
const showButton = document.getElementById('showButton');
const sendInput = document.getElementById('sendInput');
const notesSelect = document.getElementById('notes');
const modesSelect = document.getElementById('modes');

let playlist = [
  "./static/C3.mp3",
  "./static/C4.mp3",
  "./static/D3.mp3",
  "./static/D4.mp3",
  "./static/E34.mp3",
  "./static/E4.mp3",
  "./static/F3.mp3",
  "./static/F4.mp3",
  "./static/G3.mp3",
  "./static/A3.mp3",
  "./static/B3.mp3",
];

let interval;
let index;

playButton.addEventListener('click', function () {
  let track = pickTrack(playlist)
  audioSource.src = track
  audioPlayer.load();
  audioPlayer.play();
  interval = setInterval(() => {
    audioPlayer.play();
  });
}, 2000)

showButton.addEventListener('click', () => {
  clearInterval(interval)
  alert(playlist[index])
})

sendInput.addEventListener('click', async () => {
  const res = await fetch(`http://localhost:3000/change-root?root=${notesSelect.value}&mode=${modesSelect.value}`)

  playlist = await res.json()

  return false
})

function pickTrack(arr) {
  index = Math.floor(Math.random() * (arr.length))
  return playlist[index]
}