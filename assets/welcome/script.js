// Fungsi untuk pindah halaman dengan efek transisi
function bukaMenu(url) {
    const content = document.querySelector('.main-content');
    
    if (content) {
        content.style.opacity = '0';
        setTimeout(() => {
            window.location.href = url;
        }, 500); 
    } else {
        window.location.href = url;
    }
}

// Cek Login & Inisialisasi
window.addEventListener('DOMContentLoaded', () => {
    // 1. Proteksi Halaman
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "index.html";
        return; // Stop eksekusi jika tidak login
    }

    // 2. Set Nama User
    const nama = localStorage.getItem('namaUser');
    const displayNama = document.getElementById('displayNama');
    if (displayNama) {
        displayNama.textContent = nama || "Sayangku";
    }
});

// Fungsi Logout
function logout() {
    localStorage.clear();
    window.location.replace("index.html");
}