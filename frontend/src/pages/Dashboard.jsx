import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import InterviewList from "@/components/InterviewList";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [jobPos, setJobPos] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExp, setJobExp] = useState(0);

    const navigate = useNavigate();
    const {user} = useAuth();
    
    const onSubmit = async (e)=>{
        setLoading(true);
        e.preventDefault();
        try{
            const token = user.getIdToken();
            const res = await axios.post('http://localhost:3000/chat/question', {
                jobPos:jobPos,
                jobDesc:jobDesc,
                jobExp:jobExp,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const mockId = res.data.mock_id;

            if(mockId){
                setShowDialog(false);
                navigate(`/interview/${mockId}`);
            }
        }
        catch(err) {
            console.error("Error generating mock interview:", err);
            setLoading(false);
            return;
        }

        setLoading(false);
        setShowDialog(false);
    }

    return(
        <div>
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-600">Create new mock interview</p>
                <div className="flex gap-4 text-center">
                    <button onClick={()=>setShowDialog(true)} className="bg-gray-200 w-fit px-16 py-8  mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60">
                        <p>+ Technical Interview</p>
                    </button>
                    <button disabled={true} onClick={()=>setShowDialog(true)} className="bg-gray-200 w-fit px-16 py-8  mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60 disabled:pointer-events-none disabled:opacity-70">
                        <p>+ Resume Interview</p>
                    </button>
                    <button disabled={true} onClick={()=>setShowDialog(true)} className="bg-gray-200 w-fit px-16 py-8 mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60 disabled:pointer-events-none disabled:opacity-70">
                        <p>+ Behavioral Interview</p>
                    </button>
                    <button disabled={true} onClick={()=>setShowDialog(true)} className="bg-gray-200 w-fit px-16 py-8 mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60 disabled:pointer-events-none disabled:opacity-70">
                        <p>+ Real-time</p>
                    </button>
                </div>

                <DialogBox showDialog={showDialog} setShowDialog={setShowDialog} setJobPos={setJobPos} setJobDesc={setJobDesc} setJobExp={setJobExp} onSubmit={onSubmit} loading={loading} />
            </div>

            <div className="mt-6">
                <InterviewList/>
            </div>

        </div>
    )
}

function DialogBox({showDialog,setShowDialog, setJobPos, setJobDesc, setJobExp, onSubmit, loading}) {
    return(
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tell us about you interview</DialogTitle>
                <DialogDescription>
                    Add details about job role, job description, years of experience.
                </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div>
                        <Label className="text-sm text-gray-500">Job role/position</Label>
                        <Input placeholder="Ex. DevOps Engineer" required onChange={(e)=>setJobPos(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <Label className="text-sm text-gray-500">Job description/Technologies</Label>
                        <Textarea placeholder="Java, Python, Docker, Jenkins, Terraform, AWS" required onChange={(e)=>setJobDesc(e.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <Label className="text-sm text-gray-500">Years of experience</Label>
                        <Input type="number" placeholder="Ex. 5" min="0" max="30" required onChange={(e)=>setJobExp(e.target.value)}/>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button variant={"outline"} onClick={()=>setShowDialog(false)}>Cancel</Button>
                        <Button type='submit' disabled={loading}>
                            {loading?
                                <p className="flex gap-2 items-center"><LoaderCircle className="animate-spin" /> Generating</p>:
                                <p>Create interview</p>
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}