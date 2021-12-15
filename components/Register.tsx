import React,{useState} from 'react';
import { call,setToken } from '../helpers/api';
import { useRouter } from 'next/router'
import { useAuth } from "../context/AuthContext";

const initialValues = {
    'name': '',
    'username': '',
    'password': ''
}

const Register:React.FC = () => {

    const [values, setValues] = useState(initialValues);    
    const router = useRouter()
    const { handlelogin  } = useAuth();

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        call('post','api/auth/register',values)
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
                    <label className="formLabel">Name</label>
                    <input type="text" name="name" value={values.name} onChange={onChange}  required className="formInput">
                    </input>
                </div>

                <div className="mt-4">
                    <label className="formLabel">Username</label>
                    <input type="text" name="username" value={values.username} onChange={onChange} required className="formInput">
                    </input>
                </div>

                <div className="mt-4">
                    <label className="formLabel">Password</label>
                    <input type="password" name="password" value={values.password} onChange={onChange} required className="formInput">
                    </input>
                </div>

                <div className="mt-4 flex justify-center">
                    <button type="submit" className="submitButton">
                        Submit
                    </button>
                </div>
                

            </form>

        </div>
        

        
    )
}

export default Register;