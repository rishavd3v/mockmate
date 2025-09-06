import { pool } from "../utils/db.js";

export const createInterview = async (uid, mock_json, jobPos, jobDesc, jobExp, type) => {    
    const query = `
    INSERT INTO mock_question (user_id, mock_type, mock_json, job_pos, job_desc, job_exp)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    try{
        const result = await pool.query(query,[uid, type === 'technical' ? "Technical" : "Resume", JSON.stringify(mock_json), jobPos, jobDesc, jobExp]);
        return result.rows[0] || {};
    }
    catch(err){
        throw err;
    }
}

export const getAllInterviewFromDB = async (uid) => {
    const query = `SELECT * FROM mock_question where user_id = $1 ORDER BY created_at DESC`;
    try{
        const result = await pool.query(query, [uid]);
        return result.rows;
    }
    catch(err){
        throw err;
    }
}

export const getInterviewFromDB = async (mockId) => {
    const query = `SELECT * FROM mock_question where mock_id = $1`;
    try{
        const result = await pool.query(query, [mockId]);
        return result.rows[0] || {};
    }
    catch(err){
        throw err;
    }
}

export const deleteInterviewFromDB = async (mockId) => {
    const query = `DELETE FROM mock_question WHERE mock_id = $1`;
    try{
        await pool.query(query, [mockId]);
    }
    catch(err){
        throw err;
    }
}