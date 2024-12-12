const {getBarangById,updateBarangById,deleteBarangById} = require('../models/editBarangModel');

const deleteBarang = async (req, res) => {
  const { id } = req.params;

  try {
      const success = await deleteBarangById(id);
      if (!success) {
          return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      res.json({ message: 'Barang berhasil dihapus' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
  
  const getBarang = async (req, res) => {
    const { id } = req.params;
    try {
      const barang = await getBarangById(id);
      if (!barang) {
        return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      res.json(barang);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };
  
  // Fungsi untuk menyimpan hasil edit barang
  const updateBarang = async (req, res) => {
    const { id } = req.params;
    const { nama, jumlah, harga, status, kategori } = req.body;

    const cleanRupiah = (formattedValue) => {
      return parseInt(formattedValue.replace(/[^0-9]/g, '')) || 0;
  };
  
  const hargaBersih = cleanRupiah(harga);
  
    try {
      const result = await updateBarangById(id, nama, jumlah, hargaBersih, status, kategori);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      res.status(200).json({ message: 'Barang berhasil diperbarui' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };
  
  module.exports = {
    getBarang,
    updateBarang,
    deleteBarang
  };