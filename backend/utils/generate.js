import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GENAI_API_KEY||"AIzaSyDXR2z5KyzdAnX0ACwUouwUUGFiev8FIpc"});

export const model = async(jobPos,jobDesc,jobExp,ques=5)=>await ai.models.generateContent({
  model: "gemini-2.5-flash-lite-preview-06-17",
  contents: "Give me " + ques + " interview questions along with answers for a " + jobPos + " position based on the following job description/technologies: " + jobDesc + " and the candidate's experience: " + jobExp + "provide the questions and answers in a JSON format with 'question' and 'answer' keys only.",
});