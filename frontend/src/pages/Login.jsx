import { Github, UserRound } from "lucide-react";
import {useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const {signinWithGoogle, signinWithGithub, user} = useAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await signinWithGoogle();
            navigate("/dashboard");
        }catch (e) {
            console.error("Google Sign-in failed:", e);
        }
    };
    const handleGithubSignIn = async () => {
        try {
            await signinWithGithub();
            navigate("/dashboard");
        }catch (e) {
            console.error("Google Sign-in failed:", e);
        }
    };
    useEffect(() => {
        if(user){
            navigate("/dashboard");
        }
    },[])
    return(
        <div className="px-8 h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center gap-8 items-center px-4 sm:px-12 py-10 rounded-md border border-gray-200 max-h-3/4 overflow-auto scrollbar-hide shadow">
                <div className="space-y-2 text-center">
                    <p className="text- font-bold">Sign In to Mockmate</p>
                    <p className="text-xs text-gray-500">Welcome back, please sign-in to continue</p>
                </div>
                <div className="w-full space-y-4">
                    <Button className={"bg-white text-gray-900"} onClick={handleGoogleSignIn}>
                        <img className="w-5" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" />
                        <p className="text-sm">Sign In with Google</p>
                    </Button>
                    <Button className={"text-white bg-black hover:bg-gray-700"}>
                        <Github size={18}/>
                        <p className="text-sm">Sign In with Google</p>
                    </Button>
                    <Divider/>
                    <Button disabled={true}  className={"hover:bg-gray-700"} onClick={handleGithubSignIn}>
                        <UserRound size={18}/>
                        <p className="text-sm">Sign In as Guest</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Button({disabled, children, className, onClick}) {
    return (
        <button className={`flex justify-center items-center gap-4 px-12 py-2 w-full font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 border border-gray-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

function Divider(){
    return(
        <div className="flex justify-center items-center gap-2 my-6 w-full">
            <div className="h-[0.5px] w-full bg-gray-300"></div>
            <div className="text-xs pb-1">or</div>
            <div className="h-[0.5px] w-full bg-gray-300"></div>
        </div>
    )
}