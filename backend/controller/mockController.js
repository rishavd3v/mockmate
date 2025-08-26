import { pool } from "../utils/db.js";

async function saveMockData(uid, mock_json, jobPos, jobDesc, jobExp, type) {    
    const technicalQuery = `
        INSERT INTO mock_question (user_id, mock_type, mock_json, job_pos, job_desc, job_exp)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const resumeQuery = `
        INSERT INTO mock_question (user_id, mock_type, mock_json, job_pos, job_exp)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    let result;
    if( type == 'technical' ){
        result = await pool.query(technicalQuery, [uid, "Technical", JSON.stringify(mock_json), jobPos, jobDesc, jobExp]);
    }else if(type == 'resume' ){
        result = await pool.query(resumeQuery, [uid, "Resume", JSON.stringify(mock_json), jobPos, jobExp]);
    }
    return result.rows[0];
}

async function saveFeedback({mock_id, ques_no, ques, ans, user_ans, rating, feedback}){
    try{
        const insertQuery = `
            INSERT INTO feedback (mock_id, question_no, question, answer, user_ans, rating, feedback)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;
        const result = await pool.query(insertQuery, [mock_id, ques_no, ques, ans, user_ans, rating, feedback]);
        return result;
    }
    catch(error){
        console.error('Error submitting feedback:', error);
        res.status(500).send("Error submitting feedback");
    }
}

export {saveMockData, saveFeedback};