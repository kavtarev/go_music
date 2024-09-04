const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

const showButton = document.getElementById('showButton');
const changeButton = document.getElementById('changeButton');

const sendInput = document.getElementById('sendInput');
const notesSelect = document.getElementById('notes');
const modesSelect = document.getElementById('modes');

let playlist;
let index;

setPlayList()

showButton.addEventListener('click', function () {
  alert(playlist[index])
})

changeButton.addEventListener('click', () => {
  let track = pickTrack(playlist)
  audioSource.src = track
  audioPlayer.load();
})

sendInput.addEventListener('click', setPlayList)


function pickTrack(arr) {
  const newIndex = Math.floor(Math.random() * (arr.length))
  if (newIndex === index) {
    return pickTrack(arr)
  }
  index = newIndex
  return playlist[index]
}

async function setPlayList() {
  const res = await fetch(`http://localhost:3000/change-root?root=${notesSelect.value}&mode=${modesSelect.value}`)
  playlist = await res.json()

  let track = pickTrack(playlist)
  audioSource.src = track
  audioPlayer.load();
}


const playChordBtn = document.getElementById('playChordBtn')

const audioPlayer2 = document.getElementById('audioPlayer2');
const audioPlayer3 = document.getElementById('audioPlayer3');
const audioPlayer4 = document.getElementById('audioPlayer4');

playChordBtn.addEventListener('click', () => {
  audioPlayer2.play()
  audioPlayer3.play()
  audioPlayer4.play()
})

