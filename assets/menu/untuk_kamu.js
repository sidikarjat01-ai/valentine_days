/**
 * Script Untuk Kamu - Versi Final Anti-Error
 */

function initUntukKamu() {
    console.log("Memulai animasi Untuk Kamu...");

    // 1. Ambil Nama & Siapkan Data (Gunakan contentData, bukan content)
    const nama = localStorage.getItem('namaUser') || "Sayangku";
    const contentData = {
        title: `${nama}`,
        p1: `Swn yaa ws hadir dan dadi bagian sng terindah, bercahaya nde uripkuu. Sepuranee yaa Gaiso ngekek i opo2 ng smn.`,
        p2: `Bareng Smnnn, dino-dino ku bahagia yang, Senyum manis e smn selalu berhasil ge aq bahagia. Swn yaa, Swn bgt ws glm nompo ch elek iki.`,
        p3: `Dengan hari bahagia ini hari valentine, aq pgn smn ngerti betapa berhargane smn ge aq, betapa sayang e aq ro smn, betapa wedine aq nk kelangan smn. aq menghargai setiap momen momen bahagia kita momen sedih kita sng pernah kita lewati bareng bareng.`,
        p4: `Trus ro aq yaa, ajarono aq py ben iso dadi wong lanang sng smn impikan. Mugo aq iso truss dadi arek sng slalu ge smn aman yaa, sng slalu ge smn nyaman, sng slalu ge smn bahagia dan di cintai dengan tuluss sak tulus tulus e. Sepuranee yaa gaiso kyok lanangan liyo nde jobo knu, sepuranee yaa nk aq mesti jarak i smn. Smn nesu bukane tak bujuk tpi malah tak jarak, yaa abiss smn nk nesuu lucu eg hehe, maaf yaa...`,
        p5: `Happy Valentine, ${nama} 💖`,
    };

    // 2. Fungsi Pengetik (Hanya Satu)
    function typeWriter(text, elementId, speed) {
        return new Promise((resolve) => {
            let i = 0;
            const element = document.getElementById(elementId);
            if (!element) return resolve();
            
            element.innerHTML = ""; // Bersihkan dulu

            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // 3. Jalankan Urutan (startTyping)
    async function startTyping() {
        try {
            // Pastikan menggunakan contentData sesuai definisi di atas
            await typeWriter(contentData.title, "typeTitle", 70);
            await typeWriter(contentData.p1, "p1", 40);
            await typeWriter(contentData.p2, "p2", 40);
            await typeWriter(contentData.p3, "p3", 40);
            await typeWriter(contentData.p4, "p4", 40);
            await typeWriter(contentData.p5, "p5", 80);

            const btn = document.getElementById("backBtn");
            if (btn) {
                btn.style.opacity = "1";
                btn.style.transition = "opacity 1s ease";
            }
        } catch (err) {
            console.error("Animasi terhenti:", err);
        }
    }

    startTyping();
}

// 4. Jalankan saat DOM siap
if (document.readyState === "complete" || document.readyState === "interactive") {
    initUntukKamu();
} else {
    document.addEventListener("DOMContentLoaded", initUntukKamu);
}