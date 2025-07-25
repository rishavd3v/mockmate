export default function getPrompt(jobPos, jobDesc, year ,type, resume){
    const technicalPrompt = "Give me 5" + " interview questions along with answers for a " + jobPos + " position based on the following job description/technologies: " + jobDesc + " and the candidate's experience: " + year + "provide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const resumePrompt = "Give me 5 resume based interview questions along with answers for a " + jobPos + " position with the experience of " + year + " year. "+"Here the resume: " + resume +" \nprovide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const BehavioralPrompt = "Give me 5 behavioral/HR interview questions along with answers for a " + jobPos + " position based on the following job description/technologies: " + jobDesc + " and the candidate's experience: " + year + "provide the questions and answers in a JSON format with 'question' and 'answer' keys only.";

    const prompt = type === "technical" ? technicalPrompt : type === "resume" ? resumePrompt : BehavioralPrompt;
    return prompt;
}