// --- LOGIKA LOGIN & SESSION ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Mengambil input password dari field 'nama' (sesuai HTML kamu)
        const passwordInput = document.querySelector('input[name="nama"]').value.trim();
        const passwordBenar = "07102025"; 

        if (passwordInput === passwordBenar) {
            // SET SESSION: Simpan data ke localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('namaUser', 'Putri Nayla Az-zahra Sayanggg ❤️❤️');
            
            // Redirect ke halaman welcome
            window.location.href = "welcome.html";
        } else {
            // Tampilkan pesan error jika salah
            alert("Lohh kok lalii yanggg😢");
        }
    });
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

setInterval(createHeart, 300);

const style = document.createElement("style");
style.innerHTML = `
@keyframes moveUp {
    from { transform: translateY(100vh); }
    to { transform: translateY(-10vh); }
}
.floating-heart {
    position: fixed; /* Tambahkan ini agar tidak merusak layout */
    bottom: -10px;
    z-index: -1;
    animation: moveUp linear forwards;
}
`;
document.head.appendChild(style);