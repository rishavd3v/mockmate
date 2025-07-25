import {Router} from 'express';
const router = Router();
import {model} from '../utils/generate.js';
import getPrompt from '../utils/prompt.js';
import multer from 'multer';
import {extractTextFromPDF} from '../utils/parsePdf.cjs';
import { saveFeedback, saveMockData } from '../controller/mockController.js';
const upload = multer({ storage: multer.memoryStorage() });

router.post('/technical', async (req, res) => {
    const {jobPos, jobDesc, jobExp, type} = req.body;
    
    const uid = req.user.uid;

    const year = jobExp=="Fresher" ? "0-1" : jobExp=="Intermediate" ? "2-4" : "4+";
    const prompt = getPrompt(jobPos, jobDesc, year, type);
    const response = await model(prompt);
    const data = response.text;
    const jsonRes = data.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const mock_json = JSON.parse(jsonRes);
    const savedMockId = await saveMockData(uid, mock_json, jobPos, jobDesc, year, type);

    res.send({ mock_id: savedMockId});
});

router.post('/resume', upload.single('resume'), async (req, res) => {
    const { jobPos, jobExp, type } = req.body;
    const resume = req.file;
    if (!resume) return res.status(400).json({ error: "No resume uploaded" });
    const uid = req.user.uid;

    const resumeText = await extractTextFromPDF(resume.buffer);

    const year = jobExp=="Fresher" ? "0-1" : jobExp=="Intermediate" ? "2-4" : "4+";
    const prompt = getPrompt(jobPos,"",year, type,resumeText);

    const response = await model(prompt);
    const data = response.text;
    const jsonRes = data.replace(/```json/g, '').replace(/```/g, '').trim();
    const mock_json = JSON.parse(jsonRes);

    const savedMockId = await saveMockData(uid, mock_json, jobPos, null, year, type);

    res.send({ mock_id: savedMockId });
});

router.post('/feedback', async (req, res) => {
    const {mock_id,ques_no,ques,ans,user_ans} = req.body;
    const prompt = `You are an interviewer. Please provide feedback on the following answer: ${user_ans}. The question asked was: ${ques}. Provide a rating from 0 to 10 and a brief feedback on area of improvement. Give response in json format with the following keys: "rating" and "feedback".`;

    const response = await model(prompt);
    const modelRes = response.text;
    const data = modelRes.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonRes = JSON.parse(data);
    const feedback = jsonRes.feedback;
    const rating = jsonRes.rating;

    const result = await saveFeedback({mock_id, ques_no, ques, ans, user_ans, feedback, rating}); 
    
    if(result.rowCount > 0){
        res.send({ message: "Feedback submitted successfully" });
    }else{
        res.status(500).send("Error submitting feedback");
    }
});

export default router;