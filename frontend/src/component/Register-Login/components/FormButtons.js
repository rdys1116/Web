import React from 'react';

const FormButtons = () => {
    return (
        <>
            <section className='form-group'>

                <button
                type='reset'
                className='form-btn' >
                    Clear
                </button>

                <button
                className='form-btn'
                type='submit'>
                    Submit
                </button>

            </section>
        </>
    )
}

export default FormButtons;
