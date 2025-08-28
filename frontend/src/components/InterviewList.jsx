import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { Skeleton } from "@/components/ui/skeleton"
import { getAllInterviews } from "@/api/axios";
import { toast } from "sonner";

export default function InterviewList(){
    const [interviewList, setInterviewList] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const {user,loading} = useAuth();

    useEffect(() => {
        setPageLoading(true);
        getInterviews();
    },[loading]);
    
    const getInterviews = async ()=>{
        if(!user || loading) return;
        const token = await user?.getIdToken();
        try{
            const data = await getAllInterviews(token);
            setInterviewList(data);
        }
        catch(err){
            toast.error("Error fetching interviews");
        }
        setPageLoading(false);

    }

    if(pageLoading){
        return(
            <div>
                <h2 className="text-lg font-medium">All past interviews</h2>
                <SkeletonCard/>
            </div>
        )
    }

    return(
        <div>
            <h2 className="text-lg font-medium">All past interviews</h2>

            {!pageLoading && Array.isArray(interviewList) && interviewList.length === 0 && (
                <p className="text-gray-500 mt-4">No interviews found.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {!pageLoading && Array.isArray(interviewList) && interviewList.map((item, index) => (
                    <InterviewCard key={index} interview={item} setInterviewList={setInterviewList}/>
                ))}
            </div>
        </div>
    )
}

function SkeletonCard() {
    return(
        <div className="mt-4">
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
                <div><Skeleton className="h-[170px] w-[418px] rounded-md" /></div>
                <div><Skeleton className="h-[170px] w-[418px] rounded-md" /></div>
                <div><Skeleton className="h-[170px] w-[418px] rounded-md" /></div>
            </div>

            <div className="sm:hidden">
                <div><Skeleton className="h-[165px] rounded-md" /></div>
            </div>
        </div>
    )
}