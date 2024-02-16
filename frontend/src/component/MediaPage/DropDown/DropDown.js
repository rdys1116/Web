import React from 'react';
import './DropDown.css';

const DropDown = (props) => {
    const { title, options, handleChange } = props;
    
    return (
        <section className='select-container'>
            <h3 className='select-title heading-3'>
                {title}
            </h3>
            <select className='select-box' onChange={(e) => handleChange(e)}>
                {
                    options.map((option) => {
                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        )
                    })
                }
            </select>
        </section>
    );
}

export default DropDown;
