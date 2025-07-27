import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Profile(){
    const {signoutUser} = useAuth();
    
    const handleLogout = async () => {
        await signoutUser();
        toast.success("Signed out successfully!");
    }
    return(
        <Button onClick={handleLogout}>Logout</Button>
    )
}