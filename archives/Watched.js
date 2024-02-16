import React from 'react';

const ToggleButton = props => {
    const {
        className, name,
        state, handleClick,
        onTrue, onFalse
    } = props;
    return (
        <div className={className}>
            <button 
            className='watchedIcon' 
            name={name}
            onClick={handleClick}
            >
                { state ? onTrue : onFalse }
            </button>
        </div>
    );
}

export default ToggleButton;
