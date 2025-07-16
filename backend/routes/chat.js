import {Router} from 'express';
const router = Router();
import {model} from '../utils/generate.js';
import { pool } from '../utils/db.js';

router.post('/generate', async (req, res) => {
    const {jobPos, jobDesc, jobExp, ques} = req.body;
    const response = await model(jobPos, jobDesc, jobExp, ques);
    const data = response.text;
    res.send(data);
});

router.post('/create', async (req, res) => {
    const {mock_id, mock_json, jobPos, jobDesc, jobExp,email} = req.body;
    const query = `
        INSERT INTO mock_question (mock_id, mock_json, job_pos, job_desc, job_exp, user_email)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING mock_id;
    `;
    try{
        const result = await pool.query(query, [mock_id, JSON.stringify(mock_json), jobPos, jobDesc, jobExp, email]);
        res.json({ mock_id: result.rows[0].mock_id });
    }
    catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data');
    }
});

export default router;