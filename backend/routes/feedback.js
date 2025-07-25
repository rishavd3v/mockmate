import express from 'express';
import { pool } from '../utils/db.js';
const router = express.Router();

router.get('/:mock_id', async (req, res) => {
    const mockId = req.params.mock_id;
    if(!mockId){
        return res.status(400).send("Mock ID is required");
    }

    const query = `SELECT * FROM feedback WHERE mock_id = $1 ORDER BY created_at`;
    try{
        const result = await pool.query(query, [mockId]);
        res.send(result.rows || []);
    }
    catch (error){
        console.error('Error fetching feedback:', error);
        res.status(500).send("Error fetching feedback");
    } 
})

export default router;