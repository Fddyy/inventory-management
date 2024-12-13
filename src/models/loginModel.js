const db = require('../config/db');
const bcrypt = require('bcrypt');

const cekUser = async (email, password) => {
    try {
        // mencari user berdasarkan email
        const [user] = await db.query('SELECT * FROM tb_user WHERE email = ?', [email]);

        // Cek apakah user ditemukan
        if (!user[0]) {
            console.log("Email tidak ditemukan.");
            return false;
        };
        
        var emailUser = user[0]

        // Verifikasi password dengan hash yang tersimpan
        const match = await bcrypt.compare(password, emailUser.password);
        if (match) {
            console.log("User verified!!");
            return true;
        } else {
            console.log("Invalid user!!.");
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    };
};

module.exports = cekUser;