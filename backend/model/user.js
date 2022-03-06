const pool = require("./db");


class user_model {
    static async getUserId(username, password) {
            const credentials = await pool.query("SELECT id FROM users WHERE username = $1 AND password = $2",
                [username, password]);
            return credentials.rows[0];
    }
    }

}

module.exports = user_model;