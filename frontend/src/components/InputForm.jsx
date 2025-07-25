import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InputForm({onSubmit, jobExp, setJobExp, setJobPos, setJobDesc,setResume, type, loading, setShowDialog}){
  return (
    <form onSubmit={onSubmit}>
      <div>
        <Label className="text-sm text-gray-500">Job role/position</Label>
        <Input
          placeholder="Ex. DevOps Engineer"
          required
          onChange={(e) => setJobPos(e.target.value)}
        />
      </div>
      {type!="resume" && <div className="mt-4">
        <Label className="text-sm text-gray-500">
          Job description/Technologies
        </Label>
        <Textarea
          placeholder="Java, Python, Docker, Jenkins, Terraform, AWS"
          required
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>}

      <div className="flex gap-2 mt-4 items-center">
        <p className="text-sm text-gray-500">Experience Level:</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {jobExp}
              <ChevronDown size={1} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select your experience</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={jobExp} onValueChange={setJobExp}>
              <DropdownMenuRadioItem value="Fresher">
                Fresher (0-1 years)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Intermediate">
                Intermediate (2-4 years)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Experienced">
                Senior (4+ years)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {type=="resume" && (
        <div className="mt-4">
          <Label className="text-sm text-gray-500">Upload Resume</Label>
          <Input type="file" accept=".pdf" required onChange={(e) => setResume(e.target.files[0])}/>
        </div>
      )}
      <div className="flex gap-4 mt-6">
        <Button variant={"outline"} onClick={() => setShowDialog(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <p className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" /> Generating
            </p>
          ) : (
            <p>Create interview</p>
          )}
        </Button>
      </div>
    </form>
  );
}