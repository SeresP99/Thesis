const pool = require("./db");


class user_model {
    static async getUserId(username, password) {
            const credentials = await pool.query("SELECT id FROM users WHERE username = $1 AND password = $2",
                [username, password]);
            return credentials.rows[0];
    }

    static async createUser(username, password, email) {
            const creation = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
                [username, email, password]);
            return creation.rows[0];
    }

    static async checkIfUsernameAvailable(username){
            const checkUsername = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            return checkUsername.rows[0] === undefined;
    }

    static async checkIfEmailAvailable(email){
        const checkEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return checkEmail.rows[0] === undefined;
    }

}

module.exports = user_model;