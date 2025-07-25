import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    return(
        <div className="flex justify-between items-center bg-gray-200 py-4 px-8">
            <Link to={"/dashboard"} className="font-semibold">MOCKMATE</Link>
            <div>
                <ul className="flex gap-4 text-sm font-semibold cursor-pointer transition-all">
                    <Menu to={'/dashboard'}>Dashboard</Menu>
                    <Menu to={'/upgrade'}>Upgrade</Menu>
                    <Menu to={'/about'}>About</Menu>
                    <Menu to={'/contact'}>Contact Us</Menu>
                </ul>
            </div>
            <div>
                <Link to={'profile'}><AvatarContainer/></Link>
            </div>
        </div>
    )
}

function Menu({to,children}){
    const [currentRoute, setCurrentRoute] = useState(location.pathname);
    
    useEffect(()=>{
        setCurrentRoute(location.pathname);
    },[location.pathname]);

    return(
        <Link to={to} className={`hover:text-purple-800 transition-colors ${currentRoute==to && "text-purple-800"}`}>{children}</Link>
    )
}

function AvatarContainer(){
    const storedUser = localStorage.getItem("user");
    const {photoURL} = storedUser?JSON.parse(storedUser) : {};
    return(
        <Avatar>
            <AvatarImage src={photoURL}/>
            <AvatarFallback><User/></AvatarFallback>
        </Avatar>
      
    )
}