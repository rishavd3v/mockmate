import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return(
        <div className="flex items-center justify-center h-[80vh]">
            <div className="space-y-4">
                <h1 className="text-xl font-bold flex gap-2 items-center">
                    <LoaderCircle className="animate-spin"/>
                    Fetching Details. Please wait.
                </h1>
            </div>
        </div>
    )
}