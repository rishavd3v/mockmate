import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import plans from '../utils/Plans.jsx'
import { Button } from "@/components/ui/button.jsx"

export default function Upgrade(){
    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold">Upgrade</h1>
            <p className="text-gray-600 text-sm">Upgrade to premium plan to access unlimited mock interview</p>

            <div className="grid grid-cols-2 gap-10 justify-center items-center mt-10">
                {plans.map((plan,index)=>(
                    <PriceCard key={index} plan={plan}/>
                ))}
            </div>

        </div>
    )
}

function PriceCard({plan}){
    return(
        <Card className={"w-full h-full text-center px-4 py-6"}>
            <CardHeader>
                <CardTitle className={"text-lg"}>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col justify-between h-full"}>
                <div>
                    <p><span className="text-3xl font-semibold">{plan.price}</span>/month</p>
                    <div className="space-y-2 mt-4">
                        {plan.features.map((feat,index)=>(
                            <p key={index} className="text-sm text-gray-600">✅{feat}</p>
                        ))}
                    </div>
                </div>
                <Button className={"mt-8"}>Choose this plan</Button>
            </CardContent>
        </Card>
    )
}