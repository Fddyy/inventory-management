const db = require('../config/db');

const deleteBarangById = async (id) => {
  await db.query('DELETE FROM tb_transaksi WHERE id_barang = ?', [id]);
  const [result] = await db.query('DELETE FROM tb_barang WHERE id_brg = ?', [id]);
  return result.affectedRows > 0;
};

// Mendapatkan barang berdasarkan ID
const getBarangById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tb_barang WHERE id_brg = ?', [id]);
  return rows[0];
};

// Mengupdate barang
const updateBarangById = async (id, nama, jumlah, harga, status, kategori) => {
  const [result] = await db.query(
    'UPDATE tb_barang SET nama_brg = ?, jumlah_brg = ?, harga_brg = ?, status_brg = ?, kategori_brg = ? WHERE id_brg = ?',
    [nama, jumlah, harga, status, kategori, id]
  );
  return result;
};

module.exports = {
  getBarangById,
  updateBarangById,
  deleteBarangById
};