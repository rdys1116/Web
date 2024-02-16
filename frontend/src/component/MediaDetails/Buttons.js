import React from 'react';
import './Button.css';

// text and click handler are managed by parent component
const Button = (props) => {
    const { onClick: handleClick, displayText, customize } = props;
    const isLoggedIn = localStorage.getItem('userId');
    if(!isLoggedIn) return null;

    return (
        <>
            {
                displayText &&
                <button
                className={customize || 'display-btn'}
                onClick={() => handleClick()}>
                    {displayText}
                </button>
            }
        </>
    );
}

export default Button;
