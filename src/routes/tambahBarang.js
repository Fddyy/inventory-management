const express = require('express');
const router = express.Router();
const {fungsiTambahBarang} = require('../controllers/tambahBrgController');
const auth = require('../middleware/auth');

router.post('/barang/tambah',auth,fungsiTambahBarang);

module.exports = router;
