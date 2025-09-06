import { deleteFeedbackFromDB, getFeedbackFromDB } from "../models/feedback.js";

export const getFeedbackById = async (req,res)=>{
    const mockId = req.params.mock_id;
    if(!mockId){
        return res.status(400).send("Mock ID is required");
    }

    try{
        const result = await getFeedbackFromDB(mockId);
        res.send(result);
    }
    catch (err){
        res.status(500).send({error: "Error fetching feedback" + err});
    }
} 

export const deleteFeedback = async (req,res)=>{
    const mockId = req.params.mock_id;
    if(!mockId){
        return res.status(400).send("Mock ID is required");
    }

    try{
        await deleteFeedbackFromDB(mockId);
        res.send({message: "Feedback deleted successfully"});
    }
    catch(error){
        res.status(500).send({error: "Error deleting feedback"});
    }
}