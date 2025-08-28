import { Router } from "express";
const router = Router();
import { pool } from "../utils/db.js";

router.get("/all", async (req, res) => {
    const uid = req.user.uid;
    if (!uid) {
        return res.status(400).send("UID not found");
    }
    
    const query = `SELECT * FROM mock_question where user_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [uid]);
    res.send(result.rows || {});
});

router.get("/:mock_id", async (req, res) => {
    const mockId = req.params.mock_id;
    if(!mockId) {
        return res.status(400).send("Mock ID is required");
    }

    const query = `SELECT * FROM mock_question where mock_id = $1`;
    const result = await pool.query(query, [mockId]);
    res.send(result.rows[0] || {});
});

router.delete("/delete/:mock_id", async (req, res) => {
    const mockId = req.params.mock_id;
    if (!mockId) {
        return res.status(400).send("Mock ID is required");
    }

    const query = `DELETE FROM mock_question WHERE mock_id = $1`;
    await pool.query(query, [mockId]);
    res.send({ message: "Mock question deleted successfully" });
})

export default router;