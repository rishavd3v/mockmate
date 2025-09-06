import {Router} from 'express';
const router = Router();
import multer from 'multer';
import { generateTechnicalInterview, generateResumeInterview, generateFeedback } from '../controller/generate.js';

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {fileSize: 512 * 1024}
});

router.post('/technical', generateTechnicalInterview);

router.post('/resume', upload.single('resume'), generateResumeInterview);

router.post('/feedback', generateFeedback);

export default router;