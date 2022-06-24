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

    static async createPoll(poll, authorId){
        const query = await pool.query(
            "INSERT INTO public.polls (title, description, author_id, opening_date, closure_date) VALUES ($1, $2, $3, $4, $5)", [poll.title, poll.description, authorId, poll.startDate, poll.endDate]
        )
        return query.rows[0];
    }

    static async getPollOptions(pollId){
        const query = await pool.query(
            "SELECT * FROM public.poll_options WHERE poll_id = $1", [pollId]
        );
        return query.rows;
    }
}

module.exports = users_polls_model;