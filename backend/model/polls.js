const pool = require("./db")

class polls_model {
    static async getAllRelationships() {
        const query = await pool.query(
            "SELECT users.username as participant, polls.title FROM users JOIN participants_polls_relationship ON users.id = participants_polls_relationship.user_id JOIN polls ON participants_polls_relationship.poll_id = polls.id")
        return query.rows[0];
    }

    static async getParticipatingPolls(userId) {
        const query = await pool.query(
            "SELECT polls.title, participants_polls_relationship.poll_id, participants_polls_relationship.has_voted FROM participants_polls_relationship JOIN polls ON participants_polls_relationship.poll_id = polls.id WHERE user_id = $1",
            [userId]);
        return query.rows;
    }

    static async getPollDetails(pollId) {
        console.log("our id: " + pollId);
        const query = await pool.query(
            "SELECT * FROM polls WHERE id = $1", [pollId]
        );
        return query.rows[0];
    }

    static async getCreatedPolls(authorId) {
        const query = await pool.query(
            "SELECT * FROM polls WHERE author_id = $1", [authorId]
        )
        return query.rows;
    }

    static async createPoll(poll, authorId) {
        console.log(poll)
        const query = await pool.query(
            "INSERT INTO public.polls (title, description, author_id, opening_date, closure_date, requires_fingerprint) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", [poll.title, poll.description, authorId, poll.startDate, poll.endDate, poll.verifiedOnly]
        )
        return query.rows[0];
    }

    static async getPollInvitation(pollId) {
        const query = await pool.query(
            "SELECT invitation FROM polls WHERE polls.id = $1", [pollId]
        );
        return query.rows[0].invitation;
    }

    static async setPollInvitation(invitation, pollId) {
        const query = await pool.query(
            "UPDATE polls SET invitation = $1 WHERE id = $2 RETURNING invitation", [invitation, pollId]
        );
        return query.rows[0];
    }

    static async getPollFromInvitation(invitation) {
        const query = await pool.query(
            "SELECT id, title, description FROM polls WHERE invitation = $1", [invitation]
        );
        return query.rows[0];
    }

    static async getPollAuthorFromInv(invitation) {
        const query = await pool.query(
            "SELECT author_id FROM polls WHERE invitation = $1", [invitation]
        );
        return query.rows[0].author_id;
    }

    static async redeemInvitation(userId, invitation) {
        const getPollId = await pool.query(
            "SELECT id FROM polls WHERE invitation = $1", [invitation]
        );
        const pollId = getPollId.rows[0].id;
        const insertParticipation = await pool.query(
            "INSERT INTO participants_polls_relationship (poll_id, user_id) VALUES ($1, $2)", [pollId, userId]
        )
        return insertParticipation.rows[0];
    };
}

module.exports = polls_model;