import { Check, Lightbulb, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "./ui/separator";
import EndInterviewDialog from "./EndInterviewDialog";

export default function QuestionCard({ question,activeQuestion, setActiveQuestion,answeredQuestions}){
    const [speaking, setSpeaking] = useState(false);
    const navigate = useNavigate();
    const { mock_id } = useParams();

    const textToSpeech = () => {
        if(speaking){
            speechSynthesis.cancel();
            setSpeaking(false); 
            return;
        }
        setSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(question[activeQuestion].question);
        utterance.onend = () => {
            setSpeaking(false);
        };
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if(speaking){
            speechSynthesis.cancel();
            setSpeaking(false);
        }
    },[activeQuestion]);

    return (
        <div className="h-screen bg-black p-4 text-white">
            <div className="text-center shadow-md flex flex-col gap-4">
                <div className="py-4">
                    <p className="font-semibold text-lg">Question {activeQuestion+1}/5</p>
                    <div>
                        {question.map((q, index) => (
                            <span key={index} className={`inline-block w-2 h-2 rounded-full ${activeQuestion === index ? 'bg-blue-500' : 'bg-gray-400'} mx-1`}></span>
                        ))}
                    </div>
                </div>
                <Separator/>

                <div className="mt-2">
                    {question.map((q,index)=>(
                        <div key={index} className={`p-2 ${activeQuestion === index ? 'bg-blue-500' : 'bg-gray-600'} rounded-md mb-4`}>
                            <p className="flex gap-4 items-center justify-center">
                                Question {index+1}
                                {answeredQuestions[index] && <Check className="rounded-full bg-green-500 p-1" size={20}/>}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            <div className="flex justify-center gap-4 mt-4 text-black">
                <Button disabled={activeQuestion<1} variant={"outline"} className="w-26" onClick={() => setActiveQuestion((prev) => (prev - 1))}>
                    Previous
                </Button>
                {activeQuestion<question.length-1 && <Button variant={"outline"} className="w-26" onClick={() => setActiveQuestion((prev) => (prev + 1))}>
                    Next
                </Button>}
                {activeQuestion==question.length-1 && <EndInterviewDialog onSubmit={()=>navigate(`/feedback/${mock_id}`)}/>}
            </div>
        </div>
    );
      
      
      
}