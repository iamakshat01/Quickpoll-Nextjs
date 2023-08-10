import React,{useContext,createContext,useState,useEffect} from "react";
import {isAuthenticated,setToken} from '../helpers/api'

type authContextType = {
    user: boolean;
    anonId: string;
    handlelogin: (auth :boolean, anonId ?:string) => void;
};

type Props = {
    children: React.ReactNode;
};

const authContextDefaultValues: authContextType = {
    user: false,
    anonId: "0",
    handlelogin: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
    
    const [user, setUser] = useState<boolean>(false);
    const [anonId, setAnonId] = useState<string>(Math.random().toString(36));
  
    useEffect(() => {
        setUser(isAuthenticated());
        setToken(localStorage.getItem('jwtToken'));
        const localId = localStorage.getItem('anonId');
        if(localId)
            setAnonId(localId)
        else
            localStorage.setItem('anonId', anonId)
    }, []);

    const handlelogin = (auth:boolean, anonId ?: string) => {
        if(anonId) {
            setAnonId(anonId);
            localStorage.setItem('anonId', anonId)
        }
        setUser(auth);
    };

    
    const value = {
        user,
        anonId,
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