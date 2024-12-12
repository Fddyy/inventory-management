// VALIDASI FORM TAMBAH BARANG
(function () {
    'use strict';
    window.addEventListener('load', function () {
        const forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


// Fungsi untuk memformat angka menjadi mata uang Rupiah
function parseRupiah(rupiah) {
    return parseInt(rupiah.replace(/[^0-9]/g, ""), 10) || 0;
  }
  
    // Fungsi untuk memformat angka ke format IDR
    function formatRupiah(angka) {
      const numString = String(angka).replace(/\D/g, ""); // Ubah ke string dan hapus karakter non-digit
      return numString.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Tambahkan titik setiap 3 digit
    }
  
    // Event Listener untuk input harga
    document.addEventListener("input", (event) => {
      if (event.target.name === "harga") {
        const input = event.target;
  

        // Format nilai input ke IDR
        const formattedValue = formatRupiah(input.value);
  
        // Tetapkan nilai yang diformat kembali ke input
        input.value = formattedValue;
  
      
      }
    });
