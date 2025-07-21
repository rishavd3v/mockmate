import ReactMarkdown from "react-markdown";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionContainer({item}){
    return(
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Ques {Number(item?.question_no)+1}: {item?.question}</AccordionTrigger>
                <AccordionContent>
                    <div className="px-2 pt-1 pb-4 space-y-2 text-sm">
                        <Rating score={item.rating} />
                        <div className="bg-gray-100 p-3 rounded-md"><span className="font-medium">Your answer</span>: {item.user_ans}</div>
                        <div className="bg-gray-100 p-3 rounded-md prose"><span className="font-medium">Actual answer:</span><ReactMarkdown>{item.answer}</ReactMarkdown></div>
                        <div className="bg-gray-100 p-3 rounded-md prose"><span className="font-medium">Feedback:</span> <ReactMarkdown>{item.feedback}</ReactMarkdown></div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

function Rating({score}){
    const textColor = score >= 8 ? "text-green-600" : score >= 5 ? "text-yellow-600" : "text-red-600";
    return(
      <div className={`${textColor} font-semibold pl-1`}>Rating: {score}/10</div>
    )
}