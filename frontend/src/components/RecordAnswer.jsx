import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { generateFeedback } from "@/api/axios";

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

    const getMediaAccess = async ()=>{
        try{
            await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true
            });
            setMicPermission(true);
            setWebcamPermission(true);
        } 
        catch(err){
            setMicPermission(false);
            setWebcamPermission(false);
            
            if(err.name === 'NotAllowedError'){
                toast.error("Please allow camera and microphone access");
            }else if(err.name === 'NotFoundError'){
                toast.error("No camera or microphone found");
            }
        }
    };

    const startListening = () => {
        try{
            SpeechRecognition.startListening({
                continuous: true,
                interimResults: true,
                language: "en-US",
            });            
        }
        catch(error){
            console.error("Error starting speech recognition:", error);
            toast.error(`Failed to start recording: ${error.message}`);
        }
    };

    const stopListening = () => {
        try{
            SpeechRecognition.stopListening();
        }
        catch(error){
            console.error("Error stopping speech recognition:", error);
        }
    };

    const handleNextQuestion = () => {
        if(activeQuestion < 4){
            setActiveQuestion(activeQuestion + 1);
        }
    }

    const handleRecord = async () => {
        speechSynthesis.cancel();
        
        if(listening){
            stopListening();
            
            if(transcript.length < 5){
                return toast.error("Answer too short, please provide a longer response.");
            }
            
            setSaving(true);
            try{
                const token = await user.getIdToken();
                const data = await generateFeedback(mock_id,activeQuestion,question,transcript,user.email,token);
                toast.success("Response saved successfully!", {
                    description: "Your answer has been recorded",
                });
                handleNextQuestion();
                onAnswered(activeQuestion);
            }
            catch(err) {
                console.error("Error saving response:", err);
                toast.error("Error saving response", {
                    description: "An error occurred while saving your response. Please try again.",
                });
            }
            resetTranscript();
            setSaving(false);
        } 
        else{
            if(!browserSupportsSpeechRecognition){
                toast.error("Your browser does not support speech recognition.");
                return;
            }
            resetTranscript();
            startListening();
        }
    }

    return(
        <div className={`flex flex-col items-center gap-4 pt-10 h-screen ${transcript.length>0?"justify-between":"justify-center"}`}>
            <div className="text-xl font-semibold text-center w-3xl">
                {question?.question}
            </div>

            <div className='flex flex-col justify-around items-center bg-black rounded-xl w-xl'>
                <div className="px-2 pt-2">
                    {webcamPermission && micPermission ? (
                        <Webcam 
                            className="rounded-lg w-2xl" 
                            onUserMediaError={() => {setWebcamPermission(false)}} 
                            onUserMedia={() => {setWebcamPermission(true)}} 
                            mirrored={true}
                        />
                    ) : (
                        <div className="sm:mt-10 p-8 text-center">
                            <div className="flex gap-4 justify-center mb-4 text-white">
                                {!webcamPermission && <VideoOff size={22} />}
                                {!micPermission && <MicOff size={22} />}
                            </div>
                            <p className="text-sm mb-4">Camera and microphone access required</p>
                            <Button
                                onClick={getMediaAccess}
                                variant="outline"
                                size="sm"
                            >
                                Grant Permissions
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-4 flex flex-col items-center w-full">

                    <Button 
                        className="rounded-xl flex items-center justify-center bg-red-500 hover:bg-red-600" 
                        onClick={() => {
                            if(!micPermission || !webcamPermission) {
                                toast.error("Please enable microphone and camera permissions to record your answer.");
                                getMediaAccess();
                            } else {
                                handleRecord();
                            }
                        }} 
                        disabled={saving || !micPermission}
                    >
                        <div className={`flex items-center gap-1 ${(listening) && "animate-pulse"}`}>
                            <Mic/> 
                            {saving ? "Saving..." : (listening) ? "Stop Recording" : "Start Recording"}
                        </div>
                    </Button>
                </div>
            </div>
            
            {transcript.length>0 && (
                <div className="overflow-y-auto bg-gray-100 p-4 rounded-md text-sm w-full">
                    <p className="font-semibold">Your Response:</p>
                    <p className="text-sm">{transcript}</p>
                </div>
            )}
        </div>
    )
}