const db = require('../config/db');

// Fungsi untuk mendapatkan semua barang berdasarkan filter
const getAll = async (filter = {}) => {
  const { kategori, nama } = filter;

  let query = 'SELECT * FROM tb_barang WHERE 1=1';
  const params = [];

  if (kategori) {
    query += ' AND kategori_brg = ?';
    params.push(kategori);
  }
  if (nama) {
    query += ' AND nama_brg LIKE ?';
    params.push(`%${nama}%`);
  }

  query += ' ORDER BY id_brg DESC LIMIT 10';

  const [rows] = await db.query(query, params);
  return rows;
};

// Fungsi untuk mendapatkan semua kategori unik
const getCategories = async () => {
  const [rows] = await db.query('SELECT DISTINCT kategori_brg FROM tb_barang');
  return rows;
};

module.exports = {
  getAll,
  getCategories,
};

