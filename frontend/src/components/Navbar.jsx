import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center bg-gray-200 py-4 px-4 sm:px-8">
            {/* Mobile Sheet Menu */}
            <div className="block sm:hidden">
                <MobileMenu />
            </div>

            <Link to={"/dashboard"} className="sm:block hidden font-semibold text-lg">MOCKMATE</Link>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-4 text-sm font-semibold transition-all">
                <Menu to={'/dashboard'}>Dashboard</Menu>
                <Menu to={'/upgrade'}>Upgrade</Menu>
                <Menu to={'/about'}>About</Menu>
                <Menu to={'/contact'}>Contact Us</Menu>
            </ul>

            {/* Desktop Avatar */}
            <div>
                <Link to={'/profile'}><AvatarContainer /></Link>
            </div>

        </div>
    );
}

function Menu({ to, children }) {
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location.pathname]);

    return (
        <Link to={to} className={`hover:text-purple-800 transition-colors ${currentRoute === to && "text-purple-800"}`}>
            {children}
        </Link>
    );
}

function AvatarContainer() {
    const storedUser = localStorage.getItem("user");
    const { photoURL } = storedUser ? JSON.parse(storedUser) : {};
    return (
        <Avatar>
            <AvatarImage src={photoURL} />
            <AvatarFallback><User /></AvatarFallback>
        </Avatar>
    );
}

function MobileMenu() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const storedUser = localStorage.getItem("user");
    const {displayName, email} = storedUser ? JSON.parse(storedUser) : {};

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
                <SheetHeader>
                    <Link to={"/dashboard"} className="font-bold text-lg">MOCKMATE</Link>
                </SheetHeader>
                <div className="flex flex-col justify-between h-full">
                    <div className="mt-4 flex flex-col justify-center items-center gap-4 font-semibold">
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/upgrade'}>Upgrade</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/contact'}>Contact Us</Link>
                        <Link to={'/profile'} className="mt-4"></Link>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 border-t mt-4">
                        <Link to={'/profile'}>
                            <AvatarContainer />
                        </Link>
                        <div>
                            <div>{displayName}</div>
                            <div className="text-sm text-gray-500">{email}</div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}