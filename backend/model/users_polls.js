const pool = require("./db");

class users_polls_model {
    static async getAllRelationships() {
        const query = await pool.query(
            "SELECT users.username as participant, polls.title FROM users JOIN participants_polls_relationship ON users.id = participants_polls_relationship.user_id JOIN polls ON participants_polls_relationship.poll_id = polls.id")
        return query.rows[0];
    }

    static async getParticipatingPolls(userId) {
        const query = await pool.query(
            "SELECT users.username as participant, polls.title, polls.id as poll_id FROM users JOIN participants_polls_relationship ON users.id = participants_polls_relationship.user_id JOIN polls ON participants_polls_relationship.poll_id = polls.id WHERE user_id = $1",
            [userId])
        return query.rows;
    }

    static async getPollDetails(pollId) {
        const query = await pool.query(
            "SELECT * FROM polls WHERE id = $1", [pollId]
        )
        return query.rows[0];
    }

    static async getCreatedPolls(authorId) {
        const query = await pool.query(
            "SELECT * FROM polls WHERE author_id = $1", [authorId]
        )
        return query.rows;
    }

    static async createPoll(poll, authorId) {
        const query = await pool.query(
            "INSERT INTO public.polls (title, description, author_id, opening_date, closure_date) VALUES ($1, $2, $3, $4, $5)", [poll.title, poll.description, authorId, poll.startDate, poll.endDate]
        )
        return query.rows[0];
    }

    static async getPollOptions(pollId) {
        const query = await pool.query(
            "SELECT * FROM public.poll_options WHERE poll_id = $1", [pollId]
        );
        return query.rows;
    }

    static async addPollOption(pollId, title, description) {
        const query = await pool.query(
            "INSERT INTO public.poll_options (title, description, poll_id) VALUES ($1, $2, $3)", [title, description, pollId]
        );
        console.log(query);
        return query.rows[0];
    }

    static async updatePollOption(id, title, description) {
        const query = await pool.query(
            "UPDATE poll_options SET title = $1, description = $2 WHERE id = $3",
            [title, description, id]
        );
        return query.rows[0];
    };

    static async deletePollOption(id) {
        const query = await pool.query(
            "DELETE FROM poll_options WHERE id = $1",
            [id]
        );
        return query.rows[0];
    }

    static async castVote(userId, chosenOptionId, pollId) {
        const querySetVoted = await pool.query(
            "UPDATE participants_polls_relationship SET has_voted = true WHERE poll_id = $1 AND user_id = $2", [pollId, userId]
        )

        const queryAddVote = await pool.query(
            "UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = $1 AND poll_id = $2", [chosenOptionId, pollId]
        )

        return !querySetVoted && !queryAddVote;
    }
}

module.exports = users_polls_model;