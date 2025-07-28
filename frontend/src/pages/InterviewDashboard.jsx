import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function InterviewDashboard() {
    const mock_id = useParams().mock_id;
    const [loading, setLoading] = useState(false);
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useAuth();
    const state = location.state;

    useEffect(()=>{
        if(state?.interviewData){
            setInterviewData(state.interviewData);
        }
        else getInterviewDetails();
    },[mock_id,user]);
    
    const getInterviewDetails = async () => {
        try{
            setLoading(true);
            const token = await user.getIdToken();
            const response = await axios.get(`${backendUrl}/mock/${mock_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setInterviewData(response.data);
        }
        catch(error){
            console.error("Error fetching interview:", error);
        }
        setLoading(false);
    }

    return (
        <main>
            <h1 className="text-xl font-bold mb-4">Let's Begin!</h1>
            {!loading  && interviewData && <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-4 justify-between items-center mt-10">
                <div className="order-2 sm:order-1">
                    <div>
                        <JobDescription interviewData={interviewData}/>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={()=>webcamEnabled && navigate('start',{state:{interviewData:interviewData}})} size={"sm"} className={`${!webcamEnabled && "opacity-50"}`}>Start Interview</Button>
                            </TooltipTrigger>
                            {!webcamEnabled && <TooltipContent>
                                <p>Enable Camera & Mic first</p>
                            </TooltipContent>}
                        </Tooltip>
                    </div>
                    <Note/>
                </div>

                <div className="order-1 sm:order-2">
                    {webcamEnabled?
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Webcam style={{height:240}} onUserMedia={()=>setWebcamEnabled(true)} onUserMediaError={()=>setWebcamEnabled(false)} mirrored={true}/>
                        </div>:
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="bg-black p-10 px-18"><img className='w-40 h-40' src='/src/assets/webcam.png' alt="" /></div>
                            <Button onClick={()=>setWebcamEnabled(true)} variant={"outline"} size={"sm"}>Enable web cam and mic</Button>
                        </div>
                    }
                </div>
            </div>}
        </main>
    );
}

function Note(){
    return(
        <div className="mt-4 sm:mt-10 bg-gray-100 p-3 text-sm space-y-3 rounded-md">
            <p className="flex gap-1"><Lightbulb size={18}/>Important Information</p>
            <p>This is a mock interview. Please answer the questions to the best of your ability. Make sure to enable your webcam and microphone before starting the interview.</p>
            <p>This interview will have 5 questions. Answer all the question for accurate analysis. At the end of the interview you will recieve your report.</p>
            <p>Note: We never store your video or audio.</p>
        </div>
    )
}

function JobDescription({interviewData}){
    const { job_pos, job_desc, job_exp } = interviewData;
    return(
        <div>
            <p className="font-medium">Job Description</p>
            <div className="my-2 text-sm">
            <div className="font-medium">
                Job Role: <span className="font-normal">{job_pos}</span>
            </div>
            {job_desc && <div className="font-medium">
                Job description/technologies: <span className="font-normal">{job_desc}</span>
            </div>}
            <div className="font-medium">
                Years of experience: <span className="font-normal">{job_exp}</span></div>
            </div>
        </div>
    )
}