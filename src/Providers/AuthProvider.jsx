import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('current user', currentUser);
            if(currentUser) {
                const userInfo = {email: currentUser.email};
                axios.post('https://library-management-server-tau.vercel.app/jwt',userInfo)
                .then(res => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [axios])

    const authInfo = {
        user, loading, createUser, googleSignIn, signIn, logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;