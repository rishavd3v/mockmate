import {model} from '../utils/generate.js';
import { getFeedbackPrompt, getPrompt } from '../utils/prompt.js';
import {createInterview} from '../models/interview.js';
import {createFeedback} from '../models/feedback.js';
import { extractTextFromPDF } from '../utils/parsePdf.cjs';

export const generateTechnicalInterview = async (req,res) => {
    const {jobPos, jobDesc, jobExp, type} = req.body;
    if(!jobPos || !jobDesc || !jobExp || !type){
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const uid = req.user.uid;
    const year = jobExp=="Fresher" ? "0-1" : jobExp=="Intermediate" ? "2-4" : "4+";
    const prompt = getPrompt(jobPos, jobDesc, year, type);
    
    try{
        const response = await model(prompt);
        const data = response.text;
        const jsonRes = data.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const mock_json = JSON.parse(jsonRes);
        const savedData = await createInterview(uid, mock_json, jobPos, jobDesc, year, type);  
        res.send({ interviewData: savedData});
    }
    catch(err){
        res.status(500).json({ error: "Error generating interview " + err});
    }
}

export const generateResumeInterview = async (req, res) => {
    const { jobPos, jobExp, type } = req.body;
    if(!jobPos || !jobExp || !req.file){
        return res.status(400).json({ error: "All fields are required" });
    }

    const resume = req.file;
    if (!resume) return res.status(400).json({ error: "No resume uploaded" });
    const uid = req.user.uid;

    try{
        const resumeText = await extractTextFromPDF(resume.buffer);
        const year = jobExp=="Fresher" ? "0-1" : jobExp=="Intermediate" ? "2-4" : "4+";
        const prompt = getPrompt(jobPos,"",year, type,resumeText);
        
        const response = await model(prompt);
        const data = response.text;
        const jsonRes = data.replace(/```json/g, '').replace(/```/g, '').trim();
        const mock_json = JSON.parse(jsonRes);
        
        const savedData = await createInterview(uid, mock_json, jobPos, null, year, type);
       
        res.send({ interviewData: savedData });
    }
    catch(err){
        res.status(500).json({ error: "Error generating questions " + err});
    }
}

export const generateFeedback = async (req, res) => {
    const {mock_id,ques_no,ques,ans,user_ans} = req.body;
    
    if(!mock_id || ques_no===undefined || !ques || !ans || !user_ans){
        console.log(req.body);
        return res.status(400).send({ error: "All fields are required" });
    }

    const prompt = getFeedbackPrompt(ques, user_ans);

    try{
        const response = await model(prompt);
        const modelRes = response.text;
        const data = modelRes.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonRes = JSON.parse(data);
        const feedback = jsonRes.feedback;
        const rating = jsonRes.rating;

        const result = await createFeedback({mock_id, ques_no, ques, ans, user_ans, feedback, rating});
        
        if(result.rowCount > 0){
            res.send({ message: "Feedback submitted successfully" });
        }else{
            res.status(500).send("Error submitting feedback");
        }
    }
    catch(err){
        res.status(500).send({ error: "Error generating feedback " + err});
    }
}