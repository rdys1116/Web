import React from 'react';

const InputWithLabel = (props) => {
    const {
        type, name, onChange, label
    } = props.details;

    return (
        <>
            <section className='form-group'>

                <input
                name={name}
                type={type}
                placeholder=' '
                onChange={onChange}
                required
                />

                <label className='input-label'>
                    {label}
                </label>

            </section>
        </>
    )
}

export default InputWithLabel;
