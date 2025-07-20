import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext";

export default function InterviewDashboard() {
    const mock_id = useParams().mock_id;
    const [loading, setLoading] = useState(true);
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(()=>{
        getInterviewDetails();
    },[mock_id,user]);
    
    const getInterviewDetails = async () => {
        try{
            const token = await user.getIdToken();
            const response = await axios.get(`http://localhost:3000/mock/${mock_id}`,{
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

    return !loading && (
        <div>
            <h1 className="text-xl font-bold mb-4">Let's Begin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center mt-10">
                <div>
                    <div>
                        <JobDescription interviewData={interviewData}/>
                        
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={()=>webcamEnabled && navigate('start',{state:{interviewData:interviewData}})} size={"sm"} className={`${!webcamEnabled && "opacity-50"}`}>Start Interview</Button>
                            </TooltipTrigger>
                            {!webcamEnabled && <TooltipContent>
                                <p>Enable Camera & Mic</p>
                            </TooltipContent>}
                        </Tooltip>
                    </div>
                    <Note/>
                </div>

                <div>
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
            </div>
        </div>
    );
}

function Note(){
    return(
        <div className="mt-10 bg-gray-100 p-3 text-sm space-y-3 rounded-md">
            <p className="flex gap-1"><Lightbulb size={18}/>Important Information</p>
            <p>This is a mock interview. Please answer the questions to the best of your ability. Make sure to enable your webcam and microphone before starting the interview.</p>
            <p>This interview will have 5 questions. Answer all the question for accurate analysis. At the end of the interview you will recieve your report.</p>
            <p>Note: We never store your video or audio.</p>
        </div>
    )
}

function JobDescription({interviewData}){
    return(
        <div>
            <p className="font-medium">Job Description</p>
            <div className="my-2 text-sm">
            <div className="font-medium">
                Job Role: <span className="font-normal">{interviewData?.job_pos}</span>
            </div>
            <div className="font-medium">
                Job description/technologies: <span className="font-normal">   {interviewData?.job_desc}</span>
            </div>
            <div className="font-medium">
                Years of experience: <span className="font-normal">{interviewData?.    job_exp}</span></div>
            </div>
        </div>
    )
}