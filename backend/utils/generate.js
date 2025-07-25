import dotenv from "dotenv";
dotenv.config();

import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GENAI_API_KEY});

export const model = async(prompt)=>await ai.models.generateContent({
  model: "gemini-2.5-flash-lite-preview-06-17",
  contents: prompt,
});