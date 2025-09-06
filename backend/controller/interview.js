import { deleteInterviewFromDB, getAllInterviewFromDB, getInterviewFromDB } from "../models/interview.js";

export const getAllInterview = async (req, res) => {
    const uid = req.user.uid;
    if (!uid) {
        return res.status(400).send("UID not found");
    }
    
    try{
        const result = await getAllInterviewFromDB(uid);
        res.send(result);
    }
    catch(err){
        res.status(500).send({error:"Error retrieving interviews "+ err});
    }
}

export const getInterviewById = async (req, res) => {
    const mockId = req.params.mock_id;
    if(!mockId) {
        return res.status(400).send("Mock ID is required");
    }
    
    try{
        const result = await getInterviewFromDB(mockId);
        res.send(result);
    }
    catch(err){
        res.status(500).send({error:"Error retrieving interview"+ err});
    }
}

export const deleteInterview = async (req,res)=>{
    const mockId = req.params.mock_id;
    if (!mockId) {
        return res.status(400).send("Mock ID is required");
    }

    try{
        await deleteInterviewFromDB(mockId);
        res.send({ message: "Mock question deleted successfully" });
    }
    catch(err){
        res.status(500).send({ error: "Error deleting mock question " + err });
    }
}