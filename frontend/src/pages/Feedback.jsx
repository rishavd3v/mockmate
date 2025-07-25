import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"
import AccordionContainer from "@/components/AccordionContainer";

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
            const feedback = await axios.get(`http://localhost:3000/feedback/${mock_id}`,{
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
            toast.dismiss();
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
                <SkeletonCard/> : (<div>
                    <p>Your overall rating: <strong>{totalRating/feedback?.length}/10</strong></p>
                    <div className="space-y-2">
                        {feedback && feedback.map((item, index) => (
                            <div key={index} ><AccordionContainer item={item} /></div>
                        ))}
                    </div>
                </div>)
            }
        </div>  
    )
}

function SkeletonCard() {
    return(
        <main className="flex flex-col gap-2 mt-4">
            <Skeleton className="mt-1 h-4 w-42 rounded-md" />
            <div className="space-y-9 mt-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-40 rounded-2xl" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-40 rounded-2xl" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-40 rounded-2xl" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-40 rounded-2xl" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-40 rounded-2xl" />
                </div>
            </div>
        </main>
    )
}