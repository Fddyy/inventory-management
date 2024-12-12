const db = require('../config/db');

const dashboardModel = {
    barang: async () => {
    const query = 'SELECT * FROM tb_barang ORDER BY id_brg DESC LIMIT 5'

    const [rows] = await db.query(query);
 return rows;
    },

    jumlahDataBarang: async () => {
        const query = 'SELECT COUNT(*) AS total FROM tb_barang';
        const [rows] = await db.execute(query);
        return rows[0].total;
      },

    persentasePertumbuhanBarang: async () => {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM tb_barang WHERE MONTH(createdAt) = MONTH(CURDATE())) -
                (SELECT COUNT(*) FROM tb_barang WHERE MONTH(createdAt) = MONTH(CURDATE()) - 1) 
                AS growth
        `;
        const [rows] = await db.execute(query);
        return rows[0].growth; // Nilai pertumbuhan barang (positif/negatif)
    },

    getUserLogin: async () => {
        const query = `SELECT username FROM tb_user`

        const [rows] = await db.execute(query);
        return rows;
    },

    getDataTransaksi: async () => {
        const query = `
            SELECT 
                MONTH(waktu) AS month,
                COUNT(*) AS total_transaksi
            FROM tb_transaksi
            WHERE waktu >= CURDATE() - INTERVAL 12 MONTH
            GROUP BY MONTH(waktu)
            ORDER BY month DESC;
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    
    getDataBarangMasuk: async () => {
        const query = `
            SELECT 
                MONTH(createdAt) AS month,
                COUNT(*) AS total_barang
            FROM tb_barang
            WHERE createdAt >= CURDATE() - INTERVAL 12 MONTH
            GROUP BY MONTH(createdAt)
            ORDER BY month DESC;
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = dashboardModel;