const pool = require("./db");

class users_polls_model {
    static async getAllRelationships(){
        const query = await pool.query(
            "SELECT users.username as participant, polls.title FROM users JOIN participants_polls_relationship ON users.id = participants_polls_relationship.user_id JOIN polls ON participants_polls_relationship.poll_id = polls.id")
        return query.rows[0];
    }

    static async getCreatedPolls(userId){
        const query = await pool.query(
            "SELECT users.username as participant, polls.title, polls.id as poll_id FROM users JOIN participants_polls_relationship ON users.id = participants_polls_relationship.user_id JOIN polls ON participants_polls_relationship.poll_id = polls.id WHERE user_id = $1",
            [userId])
        return query.rows;
    }

    static async getPollDetails(pollId){
        const query = await pool.query(
            "SELECT * FROM polls WHERE id = $1", [pollId]
        )
        return query.rows[0];
    }
}

module.exports = users_polls_model;