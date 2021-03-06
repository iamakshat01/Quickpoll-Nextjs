import React,{useState} from 'react';
import { call } from '../helpers/api';
import { useRouter } from 'next/router'
import Notification from './Notification';

const initialValues = {
    'question': '',
    'options': ['',''],
    
}

const CreatePoll: React.FC = () => {
    
    const [values,setValues] = useState(initialValues);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const router = useRouter();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    function addOption() {
        setValues({ ...values, options: [...values.options, ''] });
    }

    function handleOptionValue(e:React.ChangeEvent<HTMLInputElement>, index: number) {
        const options = values.options;
        options[index] = e.target.value;
        setValues({...values,options});
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const poll={
            "question":values.question,
            "options":values.options.filter(option => option!==''),
            
        }   
        if(poll.options && poll.options[0]!=='') {
            call('post','api/polls',poll).then((data) => {
                if (data.error) {
                    setNotify({
                        isOpen: true,
                        message: 'Poll cannot be created',
                        type: 'error'
                    })
                } else {
                    setNotify({
                        isOpen: true,
                        message: 'Poll Created Successfully',
                        type: 'success'
                    })
                    setValues(initialValues);
                    router.push(`/${data._id}`);
                }
            })
        }
      }
    
    const options = values.options.map((option,i)=>(
        <div key={i} className='mt-2'>
            <label className="text-md font-medium text-gray-900 block mb-2 ">Option {i+1} </label>
            <input type="text" value={option} key={i} onChange={e => handleOptionValue(e, i)}  required className="formInput">
            </input>
        </div>
    ));

    return (
        <div className="container mx-auto mt-10 max-w-lg p-1">
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <form onSubmit={handleSubmit}>
                <label className="text-md font-medium text-gray-900 block mb-2 ">Question</label>
                <input type="text" name="question" value={values.question} onChange={onChange} required className="formInput">
                </input>
                
                {options}

                <div className="mt-4 flex justify-around">
                    <button type="button" onClick={addOption} className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium 
                    rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center max-w-xs m-3">
                        Add Option
                    </button>

                    <button type="submit" className="submitButton max-w-xs m-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        
    )
}

export default CreatePoll;