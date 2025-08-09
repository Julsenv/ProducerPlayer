const fileInput = document.getElementById('file-input');
const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');
const playlistNameInput = document.getElementById('playlist-name');

let playlist = [];

fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach(addTrack);
  e.target.value = '';
  render();
});

function addTrack(file){
  const url = URL.createObjectURL(file);
  playlist.push({name: file.name, url});
}

function render(){
  playlistEl.innerHTML = '';
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.name + ' ';
    const playBtn = document.createElement('button');
    playBtn.textContent = 'Play';
    playBtn.onclick = () => play(index);
    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.onclick = () => move(index, -1);
    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.onclick = () => move(index, 1);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => removeTrack(index);
    li.append(playBtn, upBtn, downBtn, removeBtn);
    playlistEl.appendChild(li);
  });
}

function play(index){
  const track = playlist[index];
  if(!track) return;
  audio.src = track.url;
  audio.play();
}

function move(index, delta){
  const newIndex = index + delta;
  if(newIndex < 0 || newIndex >= playlist.length) return;
  const [track] = playlist.splice(index, 1);
  playlist.splice(newIndex, 0, track);
  render();
}

function removeTrack(index){
  playlist.splice(index, 1);
  render();
}

// Optional: expose playlist name for future persistence
playlistNameInput.addEventListener('change', () => {
  document.title = playlistNameInput.value + ' – Producer Player';
});
