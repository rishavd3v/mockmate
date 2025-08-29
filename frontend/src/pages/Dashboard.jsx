import {useState} from "react";
import InterviewList from "@/components/InterviewList";
import DialogBox from "@/components/DialogBox";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [showDialog, setShowDialog] = useState(false);
    const savedUser = JSON.parse(localStorage.getItem("user"));
    
    return(
        <main>
            <div>
                <h1 className="text-2xl font-semibold">Welcome, {savedUser?.displayName? savedUser?.displayName?.split(" ")[0]:"Silly Potato"} </h1>
                {/* <p className="text-sm text-gray-600">Create new mock interview</p> */}
                <div className="mt-2">
                    <Button onClick={()=>setShowDialog(true)}>+ New Interview</Button>
                </div>
                <DialogBox showDialog={showDialog} setShowDialog={setShowDialog}/>
            </div>

            <div className="mt-6">
                <InterviewList/>
            </div>
        </main>
    )
}

{/* function Button({onClick,children, disabled}){
    return(
        <button disabled={disabled} onClick={onClick} className="bg-gray-200 w-fit px-16 py-8  mt-4 rounded-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-60 disabled:opacity-60 disabled:pointer-events-none">
            <p>+ {children}</p>
        </button>
    )
} */}