import React, { useEffect, useState } from 'react';
import './MessageBox.css';

const useIsTimeUp = (message) => {
    const [hide, setHide] = useState(false); 
    
    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setHide(true);
        }, 2000);
    
        return () => {
            clearTimeout(hideTimer);
            setHide(false);
        };
    }, [message]);

    return hide;
}

const MessageBox = (props) => {
    const { message, styleClass, isError } = props;
    const hide = useIsTimeUp(message);

    if(!isError && hide) return null;

    return (
        <>
            {
                message &&
                <div className={styleClass || 'toast-message'}>

                    {message}

                </div>
            }
        </>
    )
}

export default MessageBox;
