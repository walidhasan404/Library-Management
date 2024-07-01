import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

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
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedInUser = result.user;
            setUser(loggedInUser);
            console.log('Logged in with Google:', loggedInUser);
            axios.post('https://library-management-server-tau.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/')
                        }
                    })
        } catch (error) {
            console.error('Error signing in with Google:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
                console.log('Logged out from Google');
            })
            .catch(error => {
                console.error('Error signing out from Google:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, loading, createUser, handleGoogleSignIn, handleGoogleSignOut, signIn, logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;