export function getPrompt(jobPos, jobDesc, year ,type, resume){
    const technicalPrompt = "Give me 5" + " interview questions along with answers for a " + jobPos + " position based on the following job description/technologies: " + jobDesc + " and the candidate's experience: " + year + "provide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const resumePrompt = "Give me 5 resume based interview questions along with answers for a " + jobPos + " position with the experience of " + year + " year. "+"Here the resume: " + resume +" \nprovide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const BehavioralPrompt = "Give me 5 behavioral/HR interview questions along with answers for a " + jobPos + " position based on the following job description/technologies: " + jobDesc + " and the candidate's experience: " + year + "provide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const prompt = type === "technical" ? technicalPrompt : type === "resume" ? resumePrompt : BehavioralPrompt;
    return prompt;
}

export function getFeedbackPrompt(ques, user_ans){
    const prompt = `You are an interviewer. Evaluate the candidate's answer critically based on his response. Question: "${ques}". Candidate's response: "${user_ans}". Use strict grading: 0 = no answer or irrelevant, 1–3 = very poor/vague, 4–6 = average with gaps, 7–8 = good but needs improvement, 9–10 = excellent. Return only valid JSON in the format: {"rating": <0-10 integer>, "feedback": "<concise feedback on weaknesses and improvements>"} without extra text.`;
    
    return prompt;
}