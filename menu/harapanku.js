function initHarapanku() {
    const items = document.querySelectorAll(".fade-item");
    
    // Pastikan item ada sebelum dijalankan
    if (items.length === 0) return;

    // Reset style dulu agar bisa dianimasikan ulang saat menu diklik
    items.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "all 0.8s ease";
    });

    // Munculkan teks satu per satu
    items.forEach((item, index) => {
        setTimeout(
            () => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            },
            1200 * (index + 1)
        );
    });
}

// Jalankan otomatis saat halaman dimuat langsung
if (document.readyState === "complete" || document.readyState === "interactive") {
    initHarapanku();
} else {
    document.addEventListener("DOMContentLoaded", initHarapanku);
}