import React,{useContext,createContext,useState,useEffect} from "react";
import {isAuthenticated,setToken} from '../helpers/api'

type authContextType = {
    user: boolean;
    handlelogin: (_:boolean) => void;
};

type Props = {
    children: React.ReactNode;
};

const authContextDefaultValues: authContextType = {
    user: false,
    handlelogin: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}



export function AuthProvider({ children }: Props) {
    
    const [user, setUser] = useState<boolean>(false);
  
    useEffect(() => {
        setUser(isAuthenticated());
        setToken(localStorage.getItem('jwtToken'));
    }, []);

    const handlelogin = (auth:boolean) => {
        setUser(auth);
    };

    
    const value = {
        user,
        handlelogin,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}