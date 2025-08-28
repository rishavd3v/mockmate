import { getInterviewData } from '@/api/axios';
import Loading from '@/components/Loading';
import QuestionCard from '@/components/QuestionCard';
import RecordAnswer from '@/components/RecordAnswer';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Interview() {
    const location = useLocation();
    const { mock_id } = useParams();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [loading, setLoading] = useState(!location.state?.interviewData);
    const [questions,setQuestions] = useState(location.state?.interviewData?.mock_json);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [mockId, setMockId] = useState(mock_id);
    const {user} = useAuth();
    
    const setData = (data) => {
        setQuestions(data.mock_json);
        setMockId(data.mock_id);
    }

    useEffect(()=>{
        const state = location.state?.interviewData;
        if(state) {
            setData(state);
            setLoading(false);
        }
        else{
            user && getInterviewDetails();
        }
    },[user]);

    const getInterviewDetails = async () => {
        setLoading(true);
        try{
            const data = await getInterviewData(mockId);
            setData(data);
        }
        catch(err){
            toast.error("Error fetching interview details. Please try again later.");
        }
        setLoading(false);
    }

    if(loading){
        return (
            <Loading className={"h-screen"}/>
        );
    }

    return !loading && questions && (
        <div className='grid md:grid-cols-10 min-h-screen'>
            
            <div className='order-2 col-span-2'><QuestionCard question={questions} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} answeredQuestions={answeredQuestions}/></div>

            <div className='order-1 md:order-2 col-span-8'>
                <RecordAnswer question={questions[activeQuestion]} activeQuestion={activeQuestion} mock_id={mockId} setActiveQuestion={setActiveQuestion} onAnswered={(index)=>{setAnsweredQuestions(prev=>({...prev, [index]:true}))}}/>
            </div>

        </div>
    )
}