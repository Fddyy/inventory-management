const {tambahTransaksi, getTransaksi} = require('../models/transaksiModel');

const getAllTransaksi = async (req,res) => {

  const dataTransaksi = await getTransaksi();

    res.render('pages/Transaksi.ejs',
      { dataTransaksi , title:'Laporan Taransaksi'})
};


const prosesTransaksi = async (req, res) => {
  const { items } = req.body; 
  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'Tidak ada barang yang diproses',
      });
    }

    const result = await tambahTransaksi(items);

    return res.json({
      status: true,
      message: `Transaksi Berhasil! Total Keseluruhan: Rp ${result.totalKeseluruhan.toLocaleString()}`,
      data: result, 
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      status: false,
      message: `Terjadi kesalahan: ${err.message}`,
    });
  }
};

module.exports = { prosesTransaksi, getAllTransaksi};
