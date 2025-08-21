import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Delete, LoaderCircle, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function InterviewCard({interview,setInterviewList}){
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();
    
    const handleDelete = async (mockId) => {
        setLoading(true);
        const token = await user?.getIdToken();
        try{
            const res = await axios.delete(`${backendUrl}/mock/delete/${mockId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(res.status === 200){
                setInterviewList((prev)=>prev.filter(item => item.mock_id !== mockId));
                toast.success("Interview deleted successfully.");
            }
        }
        catch(err){
            console.error("Error deleting interview:", err);
            toast.error("Error deleting interview. Please try again later.");
        }
        setLoading(false);
        setShowDeleteDialog(false);
    }

    return(
        <div className="bg-white p-4 rounded-md border shadow-md transition-all">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-violet-800">{capitalize(interview?.job_pos)}</h2>
                <button onClick={()=>setShowDeleteDialog(true)} className="text-gray-500 hover:text-red-600 cursor-pointer transition-colors"><Trash size={15}/></button>
            </div>
            <p className="text-sm">Experience: {interview?.job_exp} years</p>
            <p className="text-sm">Type: {interview.mock_type}</p>
            <p className="text-sm text-gray-500">Created At: {formatDate(interview?.created_at)}</p>
            <div className="flex gap-2 mt-4">
                <Button size={"sm"} variant={"outline"} onClick={()=>navigate(`/feedback/${interview?.mock_id}`)}>Feedback</Button>
                <Button size={"sm"} onClick={()=>navigate(`/interview/${interview?.mock_id}`,{state:{interviewData:interview}})}>Start Interview</Button>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the interview.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={"destructive"} onClick={()=>handleDelete(interview?.mock_id)} disabled={loading}>
                        {loading?
                            <p className="flex items-center gap-2"><LoaderCircle className="animate-spin" size={16} />Deleting</p>:"Delete"
                        }
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const capitalize = (str) => {
    return str ? str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
};