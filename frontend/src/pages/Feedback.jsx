import Collapsible from "@/components/Collapsible";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Feedback(){
    const [feedback, setFeedback] = useState();
    const [mock, setMock] = useState();
    const [loading, setLoading] = useState(true);
    const { mock_id } = useParams();
    const {user} = useAuth();

    const totalRating = feedback?.length>0 && feedback?.reduce((sum, item) => sum + Number(item.rating), 0) || 0;

    useEffect(()=>{
        user && getFeedback();
    },[user,mock_id]);
    
    const getFeedback = async () => {
        try{
            setLoading(true);
            const token = await user?.getIdToken();
            const feedback = await axios.get(`http://localhost:3000/mock/feedback/${mock_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const mock = await axios.get(`http://localhost:3000/mock/${mock_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setMock(mock.data);
            setFeedback(feedback.data);
        }
        catch(err){
            toast.error("Error fetching feedback");
        }
        setLoading(false);
    }

    if(!loading && (!feedback || feedback.length === 0)){
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Feedback</h1>
                <p className="text-sm text-gray-600">No feedback available for this mock interview.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">Feedback</h1>
                {<p className="text-sm text-gray-600">Here's your feedback for {mock?.job_pos} mock interview</p>}
            </div>
            {loading?
                <div>
                    <Skeleton count={1} className="h-8 mb-2" baseColor="#f3f4f6" highlightColor="#e5e7eb" style={{ borderRadius: '0.5rem' }} />
                    <Skeleton count={3} className="w-full h-16 mb-3" baseColor="#f3f4f6" highlightColor="#e5e7eb" style={{ borderRadius: '0.5rem' }} />
                </div> : (<div>
                    <p>Your overall rating: <strong>{totalRating/feedback?.length}/10</strong></p>
                    {feedback && feedback.map((item, index) => (
                        <div key={index} ><Collapsible item={item} /></div>
                    ))}
                </div>)
            }
        </div>  
    )
}