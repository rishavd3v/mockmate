import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
// import useSpeechToText from "react-hook-speech-to-text";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { LoaderCircle, Mic } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function RecordAnswer({question,activeQuestion,mock_id}){
    const{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({continuous: true});
    
    if(!browserSupportsSpeechRecognition){
        return <span>Your browser does not support speech recognition.</span>;
    }

    const {user} = useAuth();
    const [micPermission, setMicPermission] = useState(true);
    const [webcamPermission, setWebcamPermission] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        try{
            navigator.mediaDevices.getUserMedia({ audio: true })
            setMicPermission(true);
        }
        catch{
            setMicPermission(false);
            toast.error("Microphone permission required", {
                description: "Please allow microphone access to record your answer.",
            });
        };
    }, []);
    
    const startListening=()=>{
        SpeechRecognition.startListening({
          continuous: true,
          interimResults: true,
          language: "en-US"
        });
    };

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
            }
            catch(err){
                toast.error("Error saving response", {
                    description: "An error occurred while saving your response. Please try again.",
                });
            }
            setSaving(false);
        }
        else{
            resetTranscript();
            startListening();
        }
    }

    return(
        <div className='flex flex-col justify-center items-center gap-4 w-full h-full'>
            <div className='flex justify-center items-center md:w-full w-3/4 h-full p-4 py-8 bg-black rounded-md'>
                {webcamPermission?
                    (<Webcam onUserMediaError={()=>{setWebcamPermission(false)}} onUserMedia={()=>{setWebcamPermission(true)}} style={{height:250,zIndex:10}} mirrored={true}/>) : (<img className='sm:w-40 sm:h-40 h-30 w-30' src='/src/assets/webcam.png' alt="" />)
                }
            </div>

            <Button onClick={handleRecord} disabled={saving||!micPermission||!webcamPermission}>
                {saving?<p className="flex gap-1 items-center"><LoaderCircle className="animate-spin"/>Saving</p>:listening ? <h2 className="flex items-center gap-1 text-red-500"><Mic/>Stop Recording</h2>:"Record Answer"}
            </Button>
            
            {
                transcript.length > 0 &&
                <div className="w-full h-32 overflow-y-auto bg-gray-100 p-4 rounded-md">
                    <h3 className="font-semibold">Recorded Answer:</h3>
                    <p className="text-sm">{transcript}</p>
                </div>
            }
            
            {/* {error && <p className="text-red-500">Error: {error}</p>} */}
        </div>
    )
}