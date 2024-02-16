import { createContext, useContext, useState, useEffect } from "react";
import { signupRequest, loginRequest, verifyTToken } from "../api/auth";

import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticate, setIsAthenticate ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const signup = async (user) => {
        try {
            const res = await signupRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAthenticate(true);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors(error.response.data.message)
        }
    }

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setIsAthenticate(true);
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors(error.response.data.message)
        }
    }

    const logout = () => {
        Cookie.remove("token");
        setIsAthenticate(false);
        setUser(null)
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
       async function checkLogin (){
            const cookies = Cookie.get();
            console.log(cookies)

            if(!cookies.token){
                setIsAthenticate(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTToken(cookies.token);
                console.log(res)
                if(!res.data) {
                    setIsAthenticate(false);
                    setLoading(false);
                    return
                }

                setIsAthenticate(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAthenticate(false);
                setUser(null);
                setLoading(false);
            }
            
        } 
        checkLogin();
    }, [])


    return(
        <AuthContext.Provider value={{
            signup,
            logout,
            login,
            loading,
            user,
            isAuthenticate,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}