// Fungsi utama yang akan dipanggil oleh script.js utama
function initUntukKamu() {
    const letterEl = document.getElementById("letterData");
    if (!letterEl) return;

    const nama = localStorage.getItem('namaUser') || "Sayangku";
    const content = {
        title: `${nama}`,
        p1: `Swn yaa ws hadir dan dadi bagian sng terindah...`,
        p2: `Bareng Smnnn, dino-dino ku bahagia yang...`,
        p3: `Dengan hari bahagia ini hari valentine...`,
        p4: `Trus ro aq yaa, ajarono aq py ben iso dadi wong lanang...`,
        p5: `Happy Valentine, ${nama}`
    };

    // Reset isi agar tidak tumpuk
    ["typeTitle", "p1", "p2", "p3", "p4", "p5"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });

    async function startTyping() {
        if (!document.getElementById("typeTitle")) return;
        await typeWriter(content.title, "typeTitle", 70);
        await typeWriter(content.p1, "p1", 50);
        await typeWriter(content.p2, "p2", 50);
        await typeWriter(content.p3, "p3", 50);
        await typeWriter(content.p4, "p4", 50);
        await typeWriter(content.p5, "p5", 80);
    }

    startTyping();
}

function typeWriter(text, elementId, speed) {
    return new Promise((resolve) => {
        let i = 0;
        const el = document.getElementById(elementId);
        if (!el) return resolve();
        function type() {
            if (i < text.length && document.getElementById(elementId)) {
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else { resolve(); }
        }
        type();
    });
}

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

// Jalankan otomatis jika dibuka lewat link langsung (bukan fetch)
if (document.readyState === "complete" || document.readyState === "interactive") {
    initUntukKamu();
} else {
    document.addEventListener("DOMContentLoaded", initUntukKamu);
}