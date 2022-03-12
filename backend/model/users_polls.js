const pool = require("./db");

class users_polls_model {
    static async getAllRelationships(){
        const query = await pool.query(
            "SELECT users.username as participant, polls.title FROM users JOIN relationship_polls_users ON users.id = relationship_polls_users.user_id JOIN polls ON relationship_polls_users.poll_id = polls.id")
        return query.rows[0];
    }
}

module.exports = users_polls_model;