import QuestionCard from '@/components/QuestionCard';
import RecordAnswer from '@/components/RecordAnswer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Interview() {
    const location = useLocation();
    const { mock_id } = useParams();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [questions,setQuestions] = useState(location.state?.interviewData?.mock_json);
    const [mockId, setMockId] = useState(mock_id);
    const [userAnswer, setUserAnswer] = useState("");

    const [key, setKey] = useState(0);

    useEffect(()=>{
        const state = location.state?.interviewData;
        if(state) {
            setData(state);
        }
        else{
            getInterviewDetails();
        }
    },[]);
    
    useEffect(()=>{
        setKey(prev=> prev + 1);
        setUserAnswer("");
    },[activeQuestion]);

    const getInterviewDetails = async () => {
        try{
            const response = await axios.get(`${backendUrl}/mock/${mockId}`);
            setData(response.data);
        }
        catch(error){
            console.error("Error fetching interview:", error);
        }
    }
    const setData = (data) => {
        setQuestions(data.mock_json);
        setMockId(data.mock_id);
    }

    return questions && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-20 md:mt-20'>
            
            <div className='order-2'><QuestionCard question={questions} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} setUserAnswer={setUserAnswer}  /></div>

            <div className='order-1 md:order-2'> 
                <RecordAnswer key={key} question={questions[activeQuestion]} activeQuestion={activeQuestion} mock_id={mockId} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
            </div>

        </div>
    )
}