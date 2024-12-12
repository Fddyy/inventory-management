const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {prosesTransaksi,getAllTransaksi} = require('../controllers/transaksiController');

router.get('/transaksi',auth,getAllTransaksi)

router.post('/transaksi/tambah',auth,prosesTransaksi);

module.exports = router;
