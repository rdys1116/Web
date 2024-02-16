import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className='div-container'>
            <h1>
                Something went wrong
            </h1>
            <p>There was an error.</p>
            <p>Please report at this <a href='mailto:vajresh005@gmail.com'>gmail</a>.</p>
            <p className='suggestion-title'>Suggestions:</p>
            <ul className='suggestion-list'>
                <li>Refresh the page</li>
                <li>Go to previous page</li>
                <li>Come back in 5 mins</li>
            </ul>
        </div>
    );
}

export default ErrorPage;
