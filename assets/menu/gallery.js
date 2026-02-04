document.addEventListener("DOMContentLoaded", function () {
	let index = 0;
	const slider = document.getElementById("slider");
	const audio = document.getElementById("mySong");

	// Putar musik otomatis jika memungkinkan
	function playMusic() {
		if (audio) {
			audio.volume = 0.4;
			audio.play().catch(() => {
				document.addEventListener(
					"click",
					() => {
						audio.play();
					},
					{ once: true },
				);
			});
		}
	}

	function initGallery() {
    let index = 0;
    const slider = document.getElementById("slider");
    const images = window.galleryImages || [];

    if (!slider || images.length === 0) return;

    // Reset index jika perlu
    index = 0;

    function slide() {
        if (!document.getElementById("slider")) return; // Stop jika sudah pindah halaman

        // Efek Fade Out
        slider.style.opacity = 0;

        setTimeout(() => {
            index++;
            if (index >= images.length) {
                index = 0;
            }
            slider.src = images[index];

            // Efek Fade In
            slider.style.opacity = 1;
        }, 500);
    }

    // Jalankan interval (simpan di variable agar bisa di-clear jika perlu)
    const galleryInterval = setInterval(slide, 3000);
}

// Jalankan saat dokumen siap (untuk akses langsung via URL)
if (document.readyState === "complete" || document.readyState === "interactive") {
    initGallery();
} else {
    document.addEventListener("DOMContentLoaded", initGallery);
}

	playMusic();
	setInterval(slide, 3000);
});
