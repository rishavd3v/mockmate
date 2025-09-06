import { pool } from "../utils/db.js";

export const createFeedback = async ({mock_id, ques_no, ques, ans, user_ans, rating, feedback}) => {
    try{
        const checkQuery = `
            SELECT id FROM feedback
            WHERE mock_id = $1 AND question_no = $2
        `;
        const existingRecord = await pool.query(checkQuery, [mock_id, ques_no]);
        let result;
        if (existingRecord.rows.length > 0){
            const updateQuery = `
                UPDATE feedback 
                SET user_ans = $3, rating = $4, feedback = $5, created_at = CURRENT_TIMESTAMP
                WHERE mock_id = $1 AND question_no = $2
                RETURNING id;
            `;
            result = await pool.query(updateQuery, [mock_id, ques_no, user_ans, rating, feedback]);
        }
        else{
            const insertQuery = `
                INSERT INTO feedback (mock_id, question_no, question, answer, user_ans, rating, feedback)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id;
            `;
            result = await pool.query(insertQuery, [mock_id, ques_no, ques, ans, user_ans, rating, feedback]);
        }
        return result;
    }
    catch(error){
        console.error('Error submitting feedback:', error);
    }
}

export const getFeedbackFromDB = async (mockId) => {
    const query = `SELECT * FROM feedback WHERE mock_id = $1 ORDER BY created_at`;
    try{
        const result = await pool.query(query, [mockId]);
        return result.rows || [];
    }
    catch (err){
        throw err;
    }
}

export const deleteFeedbackFromDB = async (mockId) => {
    const query = `DELETE FROM feedback WHERE mock_id = $1`;
    const updateQuery = `UPDATE mock_question SET attempted = false WHERE mock_id = $1`;
    try{
        await pool.query(query,[mockId]);
        await pool.query(updateQuery,[mockId]);
    }
    catch(error){
        throw err;
    }
}