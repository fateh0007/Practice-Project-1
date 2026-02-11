import { createContext, useState, useEffect} from "react";
import {getCurrentUser, loginUser, logoutUser} from "../api/auth.api";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const loadUser = async() => {
            try {
                const res = await getCurrentUser();
                setUser(res.data.data); // 
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [])

    const login = async(data) =>{
        const res = await loginUser(data);
        setUser(res.data.data.user);
        setIsAuthenticated(true);
    }

    const logout = async() => {
        await logoutUser();
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}