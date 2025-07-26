import {useState} from "react";
import InterviewList from "@/components/InterviewList";
import DialogBox from "@/components/DialogBox";

export default function Dashboard() {
    const [showDialog, setShowDialog] = useState(false);
    const [interviewType, setInterviewType] = useState("");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    const handleShowDialog = (type) => {
        setInterviewType(type);
        setShowDialog(true);
    }
    
    return(
        <main>
            <div>
                <h1 className="text-2xl font-semibold">Welcome, {savedUser?.displayName} </h1>
                <p className="text-sm text-gray-600">Create new mock interview</p>
                <div className="flex flex-wrap gap-4 text-center">
                    <Button onClick={()=>handleShowDialog("technical")}>Technical Interview</Button>
                    <Button onClick={()=>handleShowDialog("resume")}>Resume Interview</Button>
                    <Button disabled={true} onClick={()=>handleShowDialog("behavioral")}>Behavioral Interview</Button>
                    <Button disabled={true} onClick={()=>handleShowDialog("realtime")}>Realtime Interview</Button>
                </div>
                <DialogBox showDialog={showDialog} setShowDialog={setShowDialog} interviewType={interviewType}/>
            </div>

            <div className="mt-6">
                <InterviewList/>
            </div>
        </main>
    )
}

function Button({onClick,children, disabled}){
    return(
        <button disabled={disabled} onClick={onClick} className="bg-gray-200 w-fit px-16 py-8  mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60 disabled:opacity-60 disabled:pointer-events-none">
            <p>+ {children}</p>
        </button>
    )
}