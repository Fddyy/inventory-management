const db = require('../config/db');

const Barang = {

    cekNamaBarang: async (nama) => {
        const query = 'SELECT COUNT(*) AS jumlah FROM tb_barang WHERE nama_brg = ?';
        const [result] = await db.execute(query, [nama]);
        return result[0].jumlah > 0; // Return true jika ada data
    },

    
    tambahBarang: async (nama, jumlah, harga, status, kategori) => {
        const query = 'INSERT INTO tb_barang (nama_brg, jumlah_brg, harga_brg, status_brg, kategori_brg) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [nama, jumlah, harga, status, kategori]);
        return result;
    }
};

module.exports = Barang;