import express from 'express';
import { deleteFeedback, getFeedbackById } from '../controller/feedback.js';
const router = express.Router();

router.get('/:mock_id', getFeedbackById);

router.delete('/:mock_id', deleteFeedback);

export default router;