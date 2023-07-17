const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: '2h',
        cover: 'assets/1.jpg',
        artist: 'MCK',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Trong Sương',
        cover: 'assets/2.jpg',
        artist: 'Minh Lai',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Chơi Như Tụi Mỹ',
        cover: 'assets/3.jpg',
        artist: 'Andree Right Hand',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Thôi Em Đừng Đi',
        cover: 'assets/4.jpg',
        artist: 'RPT MCK (ft. Trung Trần)',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'SODA',
        cover: 'assets/5.jpg',
        artist: 'MCK',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Nếu lúc đó',
        cover: 'assets/6.jpg',
        artist: 'tlinh',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Wrong Times',
        cover: 'assets/7.jpg',
        artist: 'puppy & dangrangto',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Nói Với Em',
        cover: 'assets/8.jpg',
        artist: 'BigDaddy',
    },

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);