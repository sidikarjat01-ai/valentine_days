// --- 1. PROTEKSI SESSION (WAJIB DI ATAS) ---
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = "index.html";
}

// --- 2. ANIMASI HATI (HUJAN HATI) ---
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💗";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10vh"; 
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.color = "#ff4d6d";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";

    const bg = document.querySelector(".heart-bg");
    if (bg) bg.appendChild(heart);

    const duration = Math.random() * 3 + 5;

    heart.animate(
        [
            { transform: "translateY(0) rotate(0deg)", opacity: heart.style.opacity },
            {
                transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`,
                opacity: 0,
            },
        ],
        {
            duration: duration * 1000,
            easing: "linear",
        },
    );

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
setInterval(createHeart, 400);

// --- 3. LOGIKA MUSIK KONSISTEN ---
const audio = document.getElementById("mySong");

function playConsistentMusic() {
    if (!audio) return;

    // Ambil waktu terakhir musik diputar dari session
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play().catch(() => {
        console.log("Klik di mana saja untuk memutar musik");
        document.addEventListener('click', () => audio.play(), { once: true });
    });

    // Simpan posisi musik setiap detik agar saat pindah menu tetap nyambung
    setInterval(() => {
        localStorage.setItem("musicTime", audio.currentTime);
    }, 1000);
}

async function bukaMenu(url) {
    const mainContent = document.querySelector('main');
    mainContent.style.opacity = '0';

    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.querySelector('main');

        if (newContent) {
            // --- TRICK AGAR STYLE MUNCUL ---
            // Ambil semua link CSS dari file yang di-fetch dan pasang ke halaman sekarang
            const links = doc.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                if (!document.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = link.getAttribute('href');
                    document.head.appendChild(newLink);
                }
            });

            setTimeout(() => {
                mainContent.innerHTML = newContent.innerHTML;
                mainContent.className = newContent.className;
                mainContent.style.opacity = '1';

                // --- INISIALISASI MENU ---
                if (url.includes('gallery')) typeof initGallery === 'function' && initGallery();
                if (url.includes('harapanku')) typeof initHarapanku === 'function' && initHarapanku();
                if (url.includes('reasons')) typeof initReasons === 'function' && initReasons();
                
                // KHUSUS BUNGA: Pastikan fungsi inisialisasi bunga dipanggil
                if (url.includes('bunga')) {
                    if (typeof initBunga === 'function') {
                        initBunga();
                    } else {
                        // Jika script bunganya ada di file bunga.html, kita harus muat manual
                        const flowerScript = doc.querySelector('script[src*="bunga"]');
                        if (flowerScript) {
                            const s = document.createElement('script');
                            s.src = flowerScript.src;
                            document.body.appendChild(s);
                        }
                    }
                }
                
                bindBackButtons();
            }, 300);
        }
    } catch (error) {
        console.error("Gagal load menu:", error);
        mainContent.style.opacity = '1';
    }
}

// Fungsi supaya tombol "Kembali" juga tidak mematikan musik
function bindBackButtons() {
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.onclick = function(e) {
            e.preventDefault();
            // Jika ingin benar-benar mulus tanpa mati musik, 
            // sebaiknya panggil fungsi untuk load konten welcome kembali.
            // Tapi untuk sekarang, window.location boleh jika music-persistent sudah aktif.
            window.location.href = "welcome.html"; 
        };
    }
}


// --- 5. LOGOUT ---
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Jalankan musik saat halaman load
window.addEventListener("load", playConsistentMusic);

// Tampilkan nama user dari session
window.addEventListener("DOMContentLoaded", () => {
    const namaDisplay = document.getElementById('displayNama');
    if (namaDisplay) {
        namaDisplay.textContent = localStorage.getItem('namaUser') || "Sayangku";
    }
});