import { GridBackground } from "@/components/GridBackground";
import { HeroHighlightDemo } from "@/components/HeroHighlight";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
    return (
        <>
            <GridBackground />
            <main className="absolute md:px-30 px-4">
                <motion.div className="h-screen flex flex-col gap-8 justify-center items-center text-center" initial="hidden" animate="visible"
                    variants={{
                    hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}>
                    
                    <motion.div
                        className="flex gap-2 items-center text-sm rounded-full bg-white border border-gray-300 shadow px-3 py-1"
                        variants={fadeUp}>
                        <div className="h-1 w-1 rounded-full bg-green-400"></div>
                        <p>Currently available for beta users</p>
                    </motion.div>

                    <motion.div className="text-7xl font-bold md:px-20" variants={fadeUp}>
                        <HeroHighlightDemo />
                    </motion.div>

                    <motion.div className="text-lg text-gray-600 md:px-50" variants={fadeUp}>
                        Practice technical, behavioral, and resume-based interviews with our advanced AI. Get real-time feedback and boost your confidence before the big day.
                    </motion.div>

                    <motion.div className="flex gap-8" variants={fadeUp}>
                        <Button to={"/dashboard"} className={"bg-black text-white"}>Get Started</Button>
                        <Button to={"/dashboard"} className={"bg-white hover:bg-black hover:text-white"}>Learn More</Button>
                    </motion.div>

                    <motion.div className="pt-20 flex items-center gap-8" variants={fadeUp}>
                        <p>Trusted by 1000+ professional</p>
                        <p className="bg-black w-1 h-1 rounded-full"></p>
                        <p>Free forever plan</p>
                        <p className="bg-black w-1 h-1 rounded-full"></p>
                        <p>No credit card required</p>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
}

function Button({ children, className, to }) {
    return (
        <Link to={to} className={`group flex items-center gap-2 px-4 md:px-8 py-4 md:py-4 rounded-full text-sm cursor-pointer border border-black hover:scale-105 transition-all ease-out ${className}`}>
            {children}
            <ArrowRight size={18} className="transition-all ease-out group-hover:translate-x-2" />
        </Link>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};