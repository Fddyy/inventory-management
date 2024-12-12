const BarangModel = require('../models/barangModel');

const index = async (req, res) => {
  const { kategori, nama } = req.query;

  // 
  const message = req.session.message;
    req.session.message = null;

  // Dapatkan data barang berdasarkan filter
  const barang = await BarangModel.getAll({ kategori, nama });

  // Dapatkan daftar kategori
  const categories = await BarangModel.getCategories();

  res.render('pages/daftarBarang', {
    barang,
    categories,
    message,
    filter: { kategori, nama },
    title: "Daftar Barang"
  });
};

module.exports = {
  index,
};
