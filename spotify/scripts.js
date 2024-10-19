// Music Player Controls
const audioPlayer = document.getElementById('audio-player');

document.querySelector('.player-control-icon.play').addEventListener('click', () => {
  audioPlayer.play();
});

document.querySelector('.player-control-icon.pause').addEventListener('click', () => {
  audioPlayer.pause();
});

audioPlayer.addEventListener('timeupdate', () => {
  const progressBar = document.querySelector('.progress-bar');
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

document.querySelector('.progress-bar').addEventListener('input', (e) => {
  audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
});

// Toggle Library
const libraryBox = document.querySelector('.lib-box');
const toggleLibraryButton = document.querySelector('.lib-option');

toggleLibraryButton.addEventListener('click', () => {
  libraryBox.style.display = (libraryBox.style.display === 'none' || libraryBox.style.display === '') ? 'block' : 'none';
});

// Handle Card Clicks
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    alert(`Playing playlist: ${card.querySelector('.card-title').textContent}`);
  });
});

// Search Functionality
document.querySelector('.fa-magnifying-glass').addEventListener('click', () => {
  const searchTerm = prompt('Enter playlist name:').toLowerCase();
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
});
