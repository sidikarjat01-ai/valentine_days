// Persistent Music Logic
const musicSrc = "assets/musik/musik3.mp3";

// Ciptakan elemen audio jika belum ada
let globalAudio = document.getElementById("globalAudio");
if (!globalAudio) {
    globalAudio = document.createElement("audio");
    globalAudio.id = "globalAudio";
    globalAudio.loop = true;
    globalAudio.src = musicSrc;
    globalAudio.volume = 0.4;
    document.body.appendChild(globalAudio);
}

// 1. Simpan detik musik setiap saat
globalAudio.addEventListener('timeupdate', () => {
    localStorage.setItem('lastMusicTime', globalAudio.currentTime);
});

// 2. Fungsi untuk memutar musik dari detik terakhir
function syncMusic() {
    const savedTime = localStorage.getItem('lastMusicTime');
    if (savedTime) {
        globalAudio.currentTime = parseFloat(savedTime);
    }
    
    globalAudio.play().catch(() => {
        // Jika autoplay diblokir browser, tunggu interaksi user
        document.addEventListener('click', () => {
            globalAudio.play();
        }, { once: true });
    });
}

// Jalankan saat script dimuat
syncMusic();