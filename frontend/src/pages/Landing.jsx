import { GridBackground} from "@/components/GridBackground";
import { HeroHighlightDemo } from "@/components/HeroHighlight";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
    return(
        <>
            <GridBackground/>
            <main className="absolute md:px-30 px-4">
                <div className="h-screen flex flex-col gap-8 justify-center items-center text-center">
                    <div className="flex gap-2 items-center text-sm rounded-full bg-white border border-gray-300 shadow px-3 py-1">
                        <div className="h-1 w-1 rounded-full bg-green-400"></div>
                        <p className="">Available for beta users</p>
                    </div>

                    <div className="text-7xl font-bold md:px-20">
                        <HeroHighlightDemo/>
                    </div>

                    <div className="text-lg text-gray-600 md:px-50">
                        Practice technical, behavioral, and resume-based interviews with our advanced AI. Get real-time feedback and boost your confidence before the big day.
                    </div>

                    <div className="flex gap-8">
                        <Button to={"/dashboard"} className={"bg-black text-white"}>Get Started</Button>
                        <Button to={"/dashboard"}  className={"bg-white hover:bg-black hover:text-white"}>Learn More</Button>
                    </div>

                    <div className="pt-20 flex items-center gap-8">
                        <p>Trusted by 1000+ professional</p>
                        <p className="bg-black w-1 h-1 rounded-full"></p>
                        <p>Free forever plan</p>
                        <p className="bg-black w-1 h-1 rounded-full"></p>
                        <p>No credit card required</p>
                    </div>
                </div>
            </main>
        </>
    )
}

function Button({children,className,to}){
    return(
        <Link to={to} className={`group flex items-center gap-2 px-4 md:px-8 py-4 md:py-4 rounded-full text-sm cursor-pointer border border-black hover:scale-105 transition-all ease-out ${className}`}>{children} <ArrowRight size={18} className="transition-all ease-out group-hover:translate-x-2"/></Link>
    )
}