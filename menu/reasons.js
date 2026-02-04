function initReasons() {
    const reasons = document.querySelectorAll(".reason-item");
    
    if (reasons.length === 0) return;

    // Reset state agar animasi bisa diulang (penting untuk sistem tanpa reload)
    reasons.forEach(item => {
        item.classList.remove("show");
    });

    // Munculkan alasan satu per satu dengan delay
    reasons.forEach((item, index) => {
        setTimeout(
            () => {
                item.classList.add("show");
            },
            800 * (index + 1) // Saya percepat sedikit jedanya (0.6 detik) agar tidak terlalu lama menunggu
        ); 
    });
}

// Jalankan otomatis jika dibuka langsung (refresh)
if (document.readyState === "complete" || document.readyState === "interactive") {
    initReasons();
} else {
    document.addEventListener("DOMContentLoaded", initReasons);
}