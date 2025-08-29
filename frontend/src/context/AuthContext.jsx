import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged,deleteUser, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const errorMessages = {
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/operation-not-allowed": "Email/password accounts are not enabled.",
    "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
};

const throwError = (err) => {
    return errorMessages[err.code] || "Something went wrong. Please try again.";
};

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                const userData = {
                    email: currentUser?.email,
                    displayName: currentUser?.displayName,
                    photoURL: currentUser?.photoURL,
                }
                localStorage.setItem("user", JSON.stringify(userData));
            }
            else{
                localStorage.removeItem("user");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signinWithGoogle = async () => {
        try{
            return await signInWithPopup(auth, googleProvider);
        }catch(err){
            throw throwError(err);
        }
    };
    
    const signinWithGithub = async ()=>{
        try{
            return await signInWithPopup(auth,githubProvider);
        }catch(err){
            throw throwError(err);
        }
    }

    const signinWithEmail = async (email,password)=>{
        try{
            return await signInWithEmailAndPassword(auth, email, password);
        }catch(err){
            throw throwError(err);
        }
    }

    const signupWithEmail = async (email,password)=>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            return userCredential;
        }catch(err){
            throw throwError(err);
        }
    }


    
    const signoutUser = ()=>{
        signOut(auth);
    }
    const deleteAccount = async ()=>{
        deleteUser(user);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signinWithGoogle,
            signinWithGithub,
            signinWithEmail,
            signupWithEmail,
            sendEmailVerification,
            signoutUser,
            deleteAccount,
            }}>
            {children}
        </AuthContext.Provider>
    )
}