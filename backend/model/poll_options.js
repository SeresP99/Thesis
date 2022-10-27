const pool = require("./db")

class poll_options_model {
    static async getPollOption(optionId){
        const query = await pool.query(
            "SELECT * FROM poll_options WHERE id = $1", [optionId]
        );
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
}

module.exports = poll_options_model;