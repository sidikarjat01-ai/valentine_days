// Fungsi utama yang akan dipanggil oleh script.js utama
function initUntukKamu() {
    console.log("Memulai animasi Untuk Kamu...");
    
    const letterEl = document.getElementById("letterData");
    if (!letterEl) return;

    // Ambil nama dari localStorage agar konsisten
    const nama = localStorage.getItem('namaUser') || "Sayangku";

    const content = {
        title: `${nama}`,
        p1: `Swn yaa ws hadir dan dadi bagian sng terindah, bercahaya nde uripkuu. Sepuranee yaa Gaiso ngekek i opo2 ng smn.`,
        p2: `Bareng Smnnn, dino-dino ku bahagia yang, Senyum manis e smn selalu berhasil ge aq bahagia. Swn yaa, Swn bgt ws glm nompo ch elek iki.`,
        p3: `Dengan hari bahagia ini hari valentine, aq pgn smn ngerti betapa berhargane smn ge aq, betapa sayang e aq ro smn, betapa wedine aq nk kelangan smn. aq menghargai setiap momen momen bahagia kita momen sedih kita sng pernah kita lewati bareng bareng.`,
        p4: `Trus ro aq yaa, ajarono aq py ben iso dadi wong lanang sng smn impikan. Mugo aq iso truss dadi arek sng slalu ge smn aman yaa, sng slalu ge smn nyaman, sng slalu ge smn bahagia dan di cintai dengan tuluss sak tulus tulus e. Sepuranee yaa gaiso kyok lanangan liyo nde jobo knu, sepuranee yaa nk aq mesti jarak i smn. Smn nesu bukane tak bujuk tpi malah tak jarak, yaa abiss smn nk nesuu lucu eg hehe, maaf yaa...`,
        p5: `Happy Valentine, ${nama}`,
    };

    // Reset isi elemen sebelum mulai mengetik (PENTING!)
    const targetIds = ["typeTitle", "p1", "p2", "p3", "p4", "p5"];
    targetIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });

    // Fungsi pengetik dengan proteksi pindah menu
    function typeWriter(text, elementId, speed) {
        return new Promise((resolve) => {
            let i = 0;
            const element = document.getElementById(elementId);
            if (!element) return resolve();
            
            element.classList.add("typing");

            function type() {
                // Proteksi: Berhenti jika elemen sudah hilang (user klik Back/menu lain)
                const currentEl = document.getElementById(elementId);
                if (!currentEl) return; 

                if (i < text.length) {
                    currentEl.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    currentEl.classList.remove("typing");
                    resolve();
                }
            }
            type();
        });
    }

    // Jalankan urutan pengetikan
    async function startTyping() {
        // Cek apakah elemen masih ada sebelum ngetik
        if (!document.getElementById("typeTitle")) return;
        
        await typeWriter(content.title, "typeTitle", 70);
        await typeWriter(content.p1, "p1", 50);
        await typeWriter(content.p2, "p2", 50);
        await typeWriter(content.p3, "p3", 50);
        await typeWriter(content.p4, "p4", 50);
        await typeWriter(content.p5, "p5", 80);

        const btn = document.getElementById("backBtn");
        if (btn) btn.style.opacity = "1";
    }

    startTyping();
}

// Jalankan otomatis jika dibuka lewat link langsung (bukan fetch)
if (document.readyState === "complete" || document.readyState === "interactive") {
    initUntukKamu();
} else {
    document.addEventListener("DOMContentLoaded", initUntukKamu);
}