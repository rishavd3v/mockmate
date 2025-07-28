import { Lightbulb, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionCard({ question,activeQuestion, setActiveQuestion, setUserAnswer}){
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
        setUserAnswer("");
        if(speaking){
            speechSynthesis.cancel();
            setSpeaking(false);
        }
    },[activeQuestion]);

    return (
        <div>
            <div className="p-4 rounded-md border shadow-md text-sm lg:min-h-96">
                <div className="flex items-center gap-3 flex-wrap">
                    {question.map((item,index) => (
                    <div
                        key={index}
                        onClick={() => setActiveQuestion(index)}
                        disabled={activeQuestion === index}
                        className={`flex items-center justify-center gap-2 rounded-full border px-4 py-1 cursor-pointer  ${
                        activeQuestion === index && "bg-blue-400"} ${activeQuestion!=index && "hover:bg-gray-100"}`}
                    >
                        Question {index + 1}
                    </div>
                    ))}
                    <div className="my-6 space-y-2">
                        <p className="font-medium text-base">{question[activeQuestion]?.question}</p>
                        <Volume2 className="cursor-pointer" size={18} onClick={textToSpeech}/>
                    </div>
                </div>

                <div className="p-4 bg-blue-200 text-blue-800 mt-10 rounded-md space-y-2 text-sm">
                    <p className="flex gap-1"><Lightbulb size={18}/>Note:</p>
                    <p>Click on 'Record Answer' when you are ready to answer the question. <strong>Make sure to speak loud and clear.</strong> At the end we will provide the feedback for all the attempted questions.</p>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                {activeQuestion>0 && <Button className="min-w-26" onClick={() => setActiveQuestion((prev) => (prev - 1))}>
                    Previous
                </Button>}
                {activeQuestion<question.length-1 && <Button className="min-w-26" onClick={() => setActiveQuestion((prev) => (prev + 1))}>
                    Next
                </Button>}
                {activeQuestion==question.length-1 && <Button className="min-w-26" variant={"destructive"} onClick={() => navigate(`/feedback/${mock_id}`)}>
                    End Interview
                </Button>}
            </div>
        </div>
    );
      
      
      
}