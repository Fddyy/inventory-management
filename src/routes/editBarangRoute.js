const express = require('express');
const router = express.Router();
const {getBarang,updateBarang,deleteBarang} = require('../controllers/editBrgController');
const auth = require('../middleware/auth')

// Rute untuk menampilkan daftar barang
// router.get('/edit-barang', auth ,editBarangController.getAllBarang);

// Rute untuk mendapatkan data barang berdasarkan ID (AJAX)
router.get('/edit-barang/:id', auth ,getBarang);

router.delete('/edit-barang/:id/delete',auth,deleteBarang)

// Rute untuk mengedit barang (submit form AJAX)
router.post('/edit-barang/:id/update', auth,updateBarang);

module.exports = router;
