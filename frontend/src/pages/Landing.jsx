import { Link } from "react-router-dom";

export default function Landing() {
    return(
        <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
            <h1 className="text-xl">Under development</h1>
            <Link to="/dashboard" className="text-blue-500 underline ml-2">
                Go to Dashboard
            </Link>
        </div>
    )
}