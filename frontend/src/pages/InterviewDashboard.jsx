import { Button } from "@/components/ui/button";
import { Lightbulb, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { deleteFeedback, getInterviewData } from "@/api/axios";

export default function InterviewDashboard() {
    const mock_id = useParams().mock_id;
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useAuth();
    const state = location.state;
    const [loading, setLoading] = useState(!state?.interviewData);
    
    useEffect(()=>{
        if(state?.interviewData){
            setInterviewData(state.interviewData);
            setLoading(false);
        }
        else user && getInterviewDetails();
    },[mock_id,user]);
    
    const getInterviewDetails = async () => {
        setLoading(true);
        try{
            const token = await user.getIdToken();
            const data =  await getInterviewData(mock_id,token);
            setInterviewData(data);
            setLoading(false);
        }
        catch{
            setLoading(false);
            toast.error("Error fetching interview details. Please try again later.");
        }
    }
    
    const getMediaAccess = async () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video:true })
        .then(()=>{setWebcamEnabled(true)})
        .catch(() => {
            setWebcamEnabled(false);
            toast.error("Microphone permission required", {
                description: "Please allow microphone access to record your answer.",
            });
        });
    }

    if(loading){
        return (
            <Loading className={"h-[80vh]"}/>
        );
    }

    return (
        <main>
            {!loading  && interviewData && <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-4 justify-between items-center mt-10">
                <div className="order-2 sm:order-1">
                    <h1 className="text-2xl font-bold mb-4">Ready to Start Interview?</h1>
                    <div>
                        <JobDescription interviewData={interviewData}/>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="w-min">
                                    <StartInterviewButton
                                        disabled={!webcamEnabled}
                                        interviewData={interviewData}
                                        onStartInterview={()=>{
                                            navigate(`/interview/${mock_id}/start`,{state:{interviewData}});
                                        }}
                                    />
                                </div>
                            </TooltipTrigger>
                            {!webcamEnabled && <TooltipContent>
                                <p>Enable Camera & Mic first</p>
                            </TooltipContent>}
                        </Tooltip>
                    </div>
                    <Instruction/>
                </div>

                <div className="order-1 sm:order-2">
                    {webcamEnabled?
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Webcam style={{height:240}} onUserMedia={()=>setWebcamEnabled(true)} onUserMediaError={()=>setWebcamEnabled(false)} mirrored={true}/>
                        </div>:
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="bg-black p-10 px-18"><img className='w-40 h-40' src='/webcam.png' alt="" /></div>
                            <Button onClick={getMediaAccess} variant={"outline"} size={"sm"}>Enable web cam and mic</Button>
                        </div>
                    }
                </div>
            </div>}
        </main>
    );
}

function Instruction(){
    return(
        <div className="mt-4 sm:mt-10 bg-gray-100 p-3 text-sm space-y-3 rounded-md">
            <p className="flex gap-1"><Lightbulb size={18}/>Important Information</p>
            <p>This is a mock interview. Please answer the questions to the best of your ability. Make sure to enable your webcam and microphone before starting the interview.</p>
            <p>This interview will have 5 questions. Answer all the question for accurate analysis. At the end of the interview you will recieve your report.</p>
            <p>Note: We never store your video or audio.</p>
        </div>
    )
}

function StartInterviewButton({interviewData,onStartInterview,disabled}) {
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleProceed = async () => {
        setLoading(true);
        try{
            const token = await user.getIdToken();
            const res = await deleteFeedback(interviewData.mock_id, token);
            setLoading(false);
            onStartInterview();
        }
        catch(err){
            console.error("Error starting interview.", err);
            setLoading(false);
            toast.error("Error starting interview. Please try again later.");
        }
    };

    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogTrigger asChild>
                <Button 
                    disabled={disabled}
                    onClick={()=>{
                        if(interviewData.attempted){
                            setShowDialog(true);
                        }
                        else onStartInterview();
                    }}
                >
                    Start Interview
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Interview Already Attempted</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have already attempted this interview. Starting again will overwrite your previous responses and results. 
                        Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <Button onClick={handleProceed} disabled={loading}>
                        <div className="flex gap-1">
                            {loading ? <p className="flex gap-1 items-center"><LoaderCircle className="animate-spin"/> Please wait</p>:"Yes, Start Again"}
                        </div>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function JobDescription({interviewData}){
    const { job_pos, job_desc, job_exp } = interviewData;
    return(
        <div className="mb-4">
            <p className="font-semibold text-xl">Job Description</p>
            <div className="text-sm">
                <div className="font-medium">
                    Job Role: <span className="font-normal">{job_pos}</span>
                </div>
                {job_desc && <div className="font-medium">
                    Job description/technologies: <span className="font-normal">{job_desc}</span></div>
                }
                <div className="font-medium">
                    Years of experience: <span className="font-normal">{job_exp}</span>
                </div>
            </div>
        </div>
    )
}