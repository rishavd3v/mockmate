import { Router } from "express";
const router = Router();
import { getAllInterview,getInterviewById, deleteInterview } from "../controller/interview.js";

router.get("/all", getAllInterview);

router.get("/:mock_id", getInterviewById);

router.delete("/delete/:mock_id", deleteInterview);

export default router;