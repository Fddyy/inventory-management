const {cekNamaBarang,tambahBarang} = require('../models/tambahBrgModel');

const barangController = {
  
    fungsiTambahBarang: async (req, res) => {
        const { nama, jumlah, harga, status, kategori } = req.body;

        // normalisasi nama barang
        const namaNormalisasi = nama.trim().toLowerCase();

        // fungsi parse harga ke num
        const cleanRupiah = (formattedValue) => {
          return parseInt(formattedValue.replace(/[^0-9]/g, '')) || 0;
      };
      
      const hargaBersih = cleanRupiah(harga);

        try {
            const isNamaBarangAda = await cekNamaBarang(nama);
            if (isNamaBarangAda) {
                req.session.message = {
                      message: 'Barang sudah ada, masukkan barang yang berbeda!',
                      type: 'danger'}
                return res.redirect('/barang');
            };

            // Tambahkan barang ke database
            await tambahBarang(namaNormalisasi,jumlah, hargaBersih, status, kategori);

            req.session.message = { 
                message: "Berhasil menambahkan barang!", 
                type: "success"
            };

            res.redirect('/barang');

        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    }
};

module.exports = barangController;
