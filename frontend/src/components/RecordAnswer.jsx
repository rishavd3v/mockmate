import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function RecordAnswer({question,activeQuestion,setActiveQuestion,mock_id,onAnswered}){
    const{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({continuous: true});

    const {user} = useAuth();
    const [micPermission, setMicPermission] = useState(true);
    const [webcamPermission, setWebcamPermission] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getMediaAccess();
    }, []);
    
    const getMediaAccess = async () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(()=>{setMicPermission(true)})
        .catch(() => {
            setMicPermission(false)
            toast.error("Microphone permission required", {
                description: "Please allow microphone access to record your answer.",
            });
        });
    }

    const startListening=()=>{
        SpeechRecognition.startListening({
          continuous: true,
          interimResults: true,
          language: "en-US"
        });
    };

    const handleNextQuestion = () => {
        if(activeQuestion < 4){
            setActiveQuestion(activeQuestion + 1);
        }
    }

    const handleRecord = async () => {
        speechSynthesis.cancel();

        if(listening){
            SpeechRecognition.stopListening();
            if(transcript.length < 5){
                return toast.error("Answer too short, please provide a longer response.");
            }
            setSaving(true);
            try{
                const token = await user.getIdToken();
                await axios.post(`${backendUrl}/chat/feedback`, {
                    mock_id:mock_id,
                    ques_no:activeQuestion,
                    ques:question.question,
                    ans:question.answer,
                    user_ans:transcript,
                    email:user.email,
                },{
                    headers:{
                        Authorization: `Bearer ${await token}`
                    }
                });
                toast.success("Response saved successfully!", {
                    description: "Your answer has been recorded",
                });
                handleNextQuestion();
                
            }
            catch(err){
                toast.error("Error saving response", {
                    description: "An error occurred while saving your response. Please try again.",
                });
            }
            setSaving(false);
            onAnswered(activeQuestion);
        }
        else{
            resetTranscript();
            startListening();
        }
    }

    return(
        <div className='flex flex-col justify-center items-center gap-10 h-screen'>

            <div className="text-xl font-semibold text-center w-3xl">
                {question?.question}
            </div>

            <div className='flex flex-col justify-around items-center bg-black text-white rounded-xl w-xl'>
                <div className="px-2 pt-2">
                    {webcamPermission&&micPermission?
                        (<Webcam className="rounded-lg w-2xl" onUserMediaError={()=>{setWebcamPermission(false)}} onUserMedia={()=>{setWebcamPermission(true)}} mirrored={true}/>) : <div className="sm:mt-10">
                            {(!micPermission && !webcamPermission) ? 
                                <div className="flex gap-4"><VideoOff/><MicOff/></div> : !micPermission ? <MicOff/> : <VideoOff/>
                            }
                        </div>                        
                    }
                </div>

                <div className="p-4 flex justify-center w-full">
                    <Button className="rounded-xl flex items-center justify-center bg-red-500 hover:bg-red-600" 
                        onClick={()=>{
                            if(!micPermission || !webcamPermission){
                                toast.error("Please enable microphone and camera permissions to record your answer.");
                            }
                            else handleRecord()
                        }} 
                        disabled={saving}
                    >
                        <div className={`flex items-center gap-1 ${listening&&"animate-pulse"}`}>
                            <Mic/> {listening?"Recording":"Start Recording"}
                        </div>
                    </Button>
                </div>
            </div>

            {!browserSupportsSpeechRecognition && <p className="text-red-500">Error: Your browser does not support speech recognition!</p>}

            
            
            {
                transcript.length > 0 &&
                <div className="w-full overflow-y-auto min-h-32 bg-gray-100 p-4 rounded-md">
                    <h3 className="font-semibold">Recorded Answer:</h3>
                    <p className="text-sm">{transcript}</p>
                </div>
            }

        </div>
    )
}