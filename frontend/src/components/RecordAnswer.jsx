import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function RecordAnswer({question,activeQuestion,mock_id,userAnswer,setUserAnswer}){
    const {
        error,
        isRecording,
        results,
        interimResult,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });
    const {user} = useAuth();
    const [webcamPermission, setWebcamPermission] = useState(true);

    console.log(userAnswer);

    useEffect(() => {
        {results.map((result) => (
            setUserAnswer((prev) => prev+result?.transcript)
        ))}
    },[results]);

    useEffect(() => {
        if(!webcamPermission) {
            if(!error){
                stopSpeechToText();
            }
            alert("Please allow webcam access to record your answer.");
            setUserAnswer("");
        }
    }, [webcamPermission]);

    const handleRecord = async () => {
        speechSynthesis.cancel();
        if (!webcamPermission) {
            return toast("Error saving response", {
                description: "Please enable webcam access to and record again.",
            })
        }
        if (isRecording){
            stopSpeechToText();
            if(userAnswer.length<1){
                return toast("Error saving response", {
                    description: "Answer too short, please try again.",
                })
            };
            try{
                await axios.post("http://localhost:3000/chat/feedback", {
                    mock_id:mock_id,
                    ques_no:activeQuestion,
                    ques:question.question,
                    ans:question.answer,
                    user_ans:userAnswer,
                    email:user.email,
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
            setUserAnswer("");
        }
        else {
            setUserAnswer("");
            startSpeechToText();
        }
    }

    return(
        <div className='flex flex-col justify-center items-center gap-4'>
            <div className='flex justify-center items-center w-3/4 h-full p-4 py-8 bg-black rounded-md'>
                <Webcam onUserMediaError={()=>{setWebcamPermission(false)}} onUserMedia={()=>{setWebcamPermission(true)}} style={{height:210,width:"100%",zIndex:10}} mirrored={true}/>
                <img className='w-48 h-48 absolute' src='/src/assets/webcam.png' alt="" />
            </div>
            <Button onClick={handleRecord}>
                {isRecording?<h2 className="flex items-center gap-1 text-red-500"><Mic/>Stop Recording</h2>:"Record Answer"}
            </Button>

            {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    )
}