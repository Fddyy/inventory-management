const db = require('../config/db'); 

const cekBarang = async (nama) => {
  const [rows] = await db.query('SELECT * FROM tb_barang WHERE nama_brg = ?', [nama]);
  return rows.length > 0 ? rows[0] : null;
};

const getTransaksi = async (req, res) => {
    const query = 'SELECT * FROM tb_transaksi ORDER BY id DESC LIMIT 10';
    const [rows] = await db.query(query);
   return rows;
};

// Fungsi untuk mengurangi stok barang
const kurangiStok = async (barangId, jumlah) => {
  const query = 'UPDATE tb_barang SET jumlah_brg = jumlah_brg - ? WHERE id_brg = ? AND jumlah_brg >= ?';
  const [result] = await db.query(query, [jumlah, barangId, jumlah]);
  return result.affectedRows > 0;
};

// Fungsi untuk menambah transaksi
const tambahTransaksi = async (items) => {
  // Mulai koneksi untuk transaksi MySQL
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    let totalKeseluruhan = 0;

    for (const item of items) {
      const { nama, jumlah } = item;

      // Cek barang berdasarkan nama
      const barang = await cekBarang(nama);
      if (!barang) {
        throw new Error(`Barang "${nama}" tidak ditemukan`);
      }

      if (barang.jumlah_brg < jumlah) {
        throw new Error(`Stok barang "${nama}" tidak cukup`);
      }

      const total = jumlah * barang.harga_brg;

      // Kurangi stok barang
      const stokUpdated = await kurangiStok(barang.id_brg, jumlah);
      if (!stokUpdated) {
        throw new Error(`Gagal mengurangi stok untuk barang "${nama}"`);
      }

      // Catat transaksi untuk barang ini
      const query = 'INSERT INTO tb_transaksi (id_barang, jumlah, total) VALUES (?, ?, ?)';
      await connection.query(query, [barang.id_brg, jumlah, total]);

      // Tambahkan total keseluruhan
      totalKeseluruhan += total;
    }

    // Commit transaksi setelah semua barang selesai diproses
    await connection.commit();
    return { totalKeseluruhan };

  } catch (err) {
    // Rollback jika terjadi kesalahan
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};


module.exports = { tambahTransaksi,getTransaksi };
