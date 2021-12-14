import React,{useState,useEffect} from "react";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
    
    const { user  } = useAuth();
    const [userPolls, setUserPolls] = useState<object[]>([]);
    const [allPolls, setAllPolls] = useState<object[]>([]);

    useEffect(()=>{
        
    },[]);

    return (
        <h1> Home </h1>
    )
}

export default Home;