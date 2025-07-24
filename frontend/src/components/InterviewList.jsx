import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner";

export default function InterviewList(){
    const [interviewList, setInterviewList] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);

    const {user,loading} = useAuth();

    useEffect(() => {
        setPageLoading(true);
        getAllMock();
    },[loading]);
    
    const getAllMock = async ()=>{
        const token = await user?.getIdToken();
        try{
            if(!user || loading) return;
            const res = await axios.get(`http://localhost:3000/mock/all`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInterviewList(res.data);
            setPageLoading(false);
        }
        catch(err){
            toast.error("Error fetching interviews. Please try again later.");
            console.error("Error fetching interviews:", err);
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

            {!pageLoading && interviewList.length === 0 && (
                <p className="text-gray-500 mt-4">No interviews found.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {!pageLoading && interviewList && interviewList.map((item, index) => (
                    <InterviewCard key={index} interview={item} setInterviewList={setInterviewList}/>
                ))}
            </div>
        </div>
    )
}

function SkeletonCard() {
    return(
        <div className="flex gap-4 mt-4">
        <Skeleton className="h-[150px] w-[372px] rounded-md" />
        <Skeleton className="h-[150px] w-[372px] rounded-md" />
        <Skeleton className="h-[150px] w-[372px] rounded-md" />
        {/* <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div> */}
        </div>
    )
}