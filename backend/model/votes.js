const pool = require("./db");

class votes_model {
    static async checkIfAlreadyVoted(userId, pollId) {
        const query = await pool.query(
            "SELECT has_voted FROM participants_polls_relationship WHERE user_id = $1 AND poll_id = $2", [userId, pollId]
        )
        console.log(query.rows);
        return query.rows[0].has_voted;
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

    static async getStandings(pollId) {
        const query = await pool.query(
            "SELECT title, description, vote_count FROM poll_options WHERE poll_id = $1", [pollId]
        );

        return query.rows;
    }

    static async getNumOfVotes(pollId) {
        const query = await pool.query(
            "SELECT * FROM participants_polls_relationship WHERE poll_id = $1 AND has_voted = TRUE", [pollId]
        );
        return query.rows.length;
    }

    static async checkVerificationRequired(pollId) {
        const query = await pool.query(
            "SELECT requires_fingerprint FROM polls WHERE polls.id = $1", [pollId]
        );
        return query.rows[0].requires_fingerprint;
    }
}

module.exports = votes_model;