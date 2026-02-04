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
    if (!mainContent) return;
    
    mainContent.style.opacity = '0'; // Animasi keluar

    try {
        const response = await fetch('./' + url); 
        if (!response.ok) throw new Error("File tidak ditemukan");
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.querySelector('main');

        if (newContent) {
            // --- 1. PAKSA CSS MASUK (Agar Bunga & Untuk Kamu muncul stylenya) ---
            const links = doc.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!document.querySelector(`link[href="${href}"]`)) {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = href;
                    document.head.appendChild(newLink);
                }
            });

            setTimeout(() => {
                // --- 2. GANTI KONTEN ---
                mainContent.innerHTML = newContent.innerHTML;
                mainContent.className = newContent.className;
                mainContent.style.opacity = '1'; // Munculkan kembali

                // --- 3. PAKSA SCRIPT MENYALA (Agar Gallery bisa slide & Typing jalan) ---
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(newScript);
                });

                // --- 4. PEMICU KHUSUS (Trigger manual) ---
                if (url.includes('gallery')) {
                    if (typeof initGallery === 'function') initGallery();
                }
                if (url.includes('untuk_kamu')) {
                    if (typeof startTyping === 'function') startTyping();
                }
                if (url.includes('bunga')) {
                    if (typeof initBunga === 'function') initBunga();
                }
                
                bindBackButtons(); //
            }, 300);
        }
    } catch (error) {
        console.error("Bug:", error);
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