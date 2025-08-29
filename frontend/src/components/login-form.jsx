import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Github, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signinWithGoogle, signinWithGithub,signupWithEmail, signinWithEmail,sendEmailVerification,signoutUser,user } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signinWithGithub();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err);
    }
  };
  
  const handleSignin = async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      if(mode==="signup"){
        const userCredentials = await signupWithEmail(email,password);
        if(!userCredentials.user.emailVerified){
          if(userCredentials){
            toast.success("Verification email sent! Please verify your email and sign in.");
            await signoutUser();
            setMode("signin");
            return;
          }
        }
      }
      else{
        const userCredentials = await signinWithEmail(email,password);
        if(!userCredentials?.user?.emailVerified){
          toast.error("Please verify your email before signing in.",{description:"A verification email has been sent to your email address."});
          // await sendEmailVerification(userCredentials.user);
          await signoutUser();
          return;
        }
      }
      toast.success("Signed in successfully");
      navigate("/dashboard");
    }
    catch(err){
      toast.error(err || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }

  const handleModeChange = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome {mode=="signin" && "Back"}</CardTitle>
          <CardDescription>
            {mode=="signin"?"Login with your credentials to continue to Mockmate":"Create an account to get started with Mockmate"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignin}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button type="button" variant={"outline"} onClick={handleGoogleSignIn}>
                  <img className="w-5" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" />
                  <p className="text-sm">Sign In with Google</p>
                </Button>
                <Button type="button" onClick={handleGithubSignIn}>
                  <Github size={18}/>
                  <p className="text-sm">Sign In with GitHub</p>
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e)=>setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    placeholder="Enter your password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    minLength={6}
                  />
                </div>
                <Button type="submit">
                  {loading && <LoaderCircle className="animate-spin"/>}
                  {mode=="signin"?"Login":"Create Account"}
                </Button>
              </div>
              <div className="text-center text-sm">
                {mode=="signin"?"Don't have an account?":"Already have an account?"}
                {" "}
                <button type="button" onClick={handleModeChange} className="underline underline-offset-4 cursor-pointer">
                  {mode=="signin"?"Sign up":"Sign in"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
