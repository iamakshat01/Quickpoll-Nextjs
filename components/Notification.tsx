import React,{MouseEvent} from 'react'

type notify = {
    isOpen: boolean 
    message: string,
    type: string
}

interface IProps {
    notify: notify
    setNotify: (_:notify) => void
}

// Reusable component to provide notification to user for actions performed
export default function Notification(props:IProps) {

    const { notify, setNotify } = props;

    const handleClose = (event: MouseEvent, reason:any) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    if(notify.isOpen===true) {
        return (
            <div className="flex justify-center ">
                <span className="bg-blue-100 text-blue-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 m-2">
                    {notify.message}
                </span>
            </div>
        )
    } else {
        return (<span className='invisible'></span>)
    }
    
};