import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import InputForm from "./InputForm";

export default function DialogBox({showDialog,setShowDialog,interviewType}){
    const [jobPos, setJobPos] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExp, setJobExp] = useState("Fresher");
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        let url = "";
        let data;
        const token = await user.getIdToken();
        let headers = { Authorization: `Bearer ${token}` };
        switch (interviewType) {
            case "technical":
                url = "http://localhost:3000/chat/technical";
                data = { jobPos, jobDesc, jobExp, type: interviewType };
                break;
            case "resume":
                url = "http://localhost:3000/chat/resume/";
                data = new FormData();
                data.append("resume", resume);
                data.append("jobPos", jobPos);
                data.append("jobExp", jobExp);
                data.append("type", interviewType);
                headers["Content-Type"] = "multipart/form-data";
                break;
            case "behavioral":
                url = "http://localhost:3000/chat/behavioral";
                data = { role: jobPos };
                break;
            case "realtime":
                url = "http://localhost:3000/chat/realtime";
                data = { session_start: new Date().toISOString() };
                break;
        }
        try{
            const res = await axios.post(url, data, { headers });
            const mockId = res.data.mock_id;

            if (mockId){
                setShowDialog(false);
                navigate(`/interview/${mockId}`);
            }
        }catch(err){
            console.error("Error generating mock interview:", err);
            toast.error("Failed to generate mock interview. Please try again.");
            setLoading(false);
            return;
        }
        setLoading(false);
        setShowDialog(false);
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Tell us about your interview</DialogTitle>
            <DialogDescription>
                Add details about job role, job description, experience level.
            </DialogDescription>
            </DialogHeader>
            <InputForm
                onSubmit={onSubmit}
                jobExp={jobExp}
                setJobExp={setJobExp}
                setJobPos={setJobPos}
                setJobDesc={setJobDesc}
                type={interviewType}
                setResume={setResume}
                loading={loading}
                setShowDialog={setShowDialog}
            />
        </DialogContent>
        </Dialog>
    );
}
