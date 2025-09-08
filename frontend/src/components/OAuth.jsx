import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios';


const OAuth = () => {
    const { backendUrl, setToken, setUser, setShowLogin } = useContext(AppContext);

    const handleGoogleClick = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const { data } = await axios.post( `${import.meta.env.VITE_Backend_URL}/api/auth/google`{ 
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            });

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data.user);
                setShowLogin(false);
                toast.success('Login successful!');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error('Could not sign in with Google:', error);
            toast.error('Google sign-in failed');
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="bg-red-600 w-full text-white py-2 mt-3 rounded-full hover:opacity-95"
        >
            Continue with Google
        </button>
    );
};

export default OAuth;