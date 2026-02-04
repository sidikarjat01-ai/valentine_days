// --- 1. PROTEKSI SESSION ---
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
// Ganti 'const' menjadi 'var' agar tidak error "already been declared"
var myAudio = document.getElementById("mySong") || document.getElementById("globalAudio");

function playConsistentMusic() {
    if (!myAudio) return;

    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        myAudio.currentTime = parseFloat(savedTime);
    }

    myAudio.play().catch(() => {
        document.addEventListener('click', () => myAudio.play(), { once: true });
    });

    setInterval(() => {
        if (!myAudio.paused) {
            localStorage.setItem("musicTime", myAudio.currentTime);
        }
    }, 1000);
}

// --- 4. LOGIKA BUKA MENU (SPA) ---
async function bukaMenu(url) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    mainContent.style.opacity = '0';

    try {
        const response = await fetch('./' + url); 
        if (!response.ok) throw new Error("Gagal ambil file");
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('main');

        if (newContent) {
            // Tarik CSS
            const links = doc.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!document.querySelector(`link[href="${href}"]`)) {
                    const nl = document.createElement('link');
                    nl.rel = 'stylesheet'; nl.href = href;
                    document.head.appendChild(nl);
                }
            });

            setTimeout(() => {
                mainContent.innerHTML = newContent.innerHTML;
                mainContent.className = newContent.className;
                
                // PAKSA OPACITY 1 agar konten tidak transparan
                mainContent.style.opacity = '1';
                mainContent.style.visibility = 'visible';

                // Jalankan script tujuan tanpa duplikasi script utama/musik
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    if (oldScript.src) {
                        // Jangan load ulang script utama/musik agar tidak tabrakan
                        if (!oldScript.src.includes('script.js') && !oldScript.src.includes('musik.js')) {
                            const newScript = document.createElement("script");
                            newScript.src = oldScript.src;
                            document.body.appendChild(newScript);
                        }
                    } else {
                        const newScript = document.createElement("script");
                        newScript.textContent = oldScript.textContent;
                        document.body.appendChild(newScript);
                    }
                });

                // Tunggu script ter-load sebelum panggil fungsi
                setTimeout(() => {
                    if (url.includes('untuk_kamu') && typeof initUntukKamu === 'function') initUntukKamu();
                    if (url.includes('gallery') && typeof initGallery === 'function') initGallery();
                    if (url.includes('bunga') && typeof initBunga === 'function') initBunga();
                }, 300);

                bindBackButtons();
            }, 300);
        }
    } catch (e) { 
        console.error("Error:", e); 
        mainContent.style.opacity = '1'; 
    }
}

function bindBackButtons() {
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = "welcome.html"; 
        };
    }
}

// --- 5. INITIALIZATION ---
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

window.addEventListener("load", playConsistentMusic);

window.addEventListener("DOMContentLoaded", () => {
    const namaDisplay = document.getElementById('displayNama');
    if (namaDisplay) {
        namaDisplay.textContent = localStorage.getItem('namaUser') || "Sayangku";
    }
});