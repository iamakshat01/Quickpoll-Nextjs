import React,{useState} from 'react';
import { call,setToken } from '../helpers/api';
import { useRouter } from 'next/router'
import { useAuth } from "../context/AuthContext";

const initialValues = {
    'username': '',
    'password': ''
}

const Login:React.FC = () => {

    const [values, setValues] = useState(initialValues);    
    const router = useRouter()
    const { handlelogin  } = useAuth();

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        call('post','api/auth/login',values)
        .then((data)=>{
            setToken(data.token);
            router.push('/');
            handlelogin(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="container mx-auto mt-10 max-w-xs">
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="text-md font-medium text-gray-900 block mb-2 ">Username</label>
                    <input type="string" name="username" value={values.username} onChange={onChange} id="username" required className="bg-gray-50 border border-gray-400 text-gray-900 
                        text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                    </input>
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="text-md font-medium text-gray-900 block mb-2 ">Password</label>
                    <input type="password" name="password" value={values.password} onChange={onChange} id="password" required className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                    </input>
                </div>

                <div className="mt-4 flex justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center max-w-xs">
                        Submit
                    </button>
                </div>
                

            </form>

        </div>
        

        
    )
}

export default Login;