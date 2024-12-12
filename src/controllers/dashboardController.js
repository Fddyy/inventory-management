const {barang,jumlahDataBarang, persentasePertumbuhanBarang, getUserLogin,getDataTransaksi,getDataBarangMasuk } = require('../models/dashboardModel');

const dashboardController = async (req,res) => {
    const message = req.session.message;
    req.session.message = null;
    
    const jumlahData = await jumlahDataBarang();
    const daftarBarang = await barang();
    const pertumbuhanBarang = await persentasePertumbuhanBarang();
    const getUser = await getUserLogin();
    const transaksiData = await getDataTransaksi();
    const barangMasuk = await getDataBarangMasuk();

    const chartData1 = {
        labels: transaksiData.map(item => `Bulan ${item.month}`),
        values: transaksiData.map(item => item.total_transaksi),
    };

    const chartData2 = {
        labels: barangMasuk.map(item => `Bulan ${item.month}`),
        values: barangMasuk.map(item => item.total_barang),
    };

    res.render('pages/Dashboard.ejs', { message,daftarBarang,jumlahData,pertumbuhanBarang, getUser,chartData1,chartData2 ,title:"LA Dashboard"});
};

module.exports = dashboardController;