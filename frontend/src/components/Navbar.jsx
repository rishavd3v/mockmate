import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    useEffect(()=>{
        setCurrentRoute(location.pathname);
    },[location.pathname]);

    return(
        <div className="flex justify-between items-center bg-gray-200 py-4 px-8">
            <Link to={"/dashboard"} className="font-semibold">MOCKMATE</Link>
            <div>
                <ul className="flex gap-4 text-sm font-semibold cursor-pointer">
                    <Link to={'/dashboard'} className={`${currentRoute=='/dashboard'&&"text-purple-800"}`}>Dashboard</Link>
                    <Link to={'/upgrade'}>Upgrade</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'}>Contact</Link>
                </ul>
            </div>
            <div>
                <Link to={'profile'}><Avatar/></Link>
            </div>
        </div>
    )
}

function Avatar(){
    const {user} = useAuth();
    return(
        <div>
            {user && user.photoURL ? <img src={user.photoURL} alt="" className={`cursor-pointer aspect-square rounded-full w-8`}/>:<div className='rounded-full aspect-square flex items-center justify-center bg-white p-2'><User size={16}/></div>}            
        </div>
    )
}