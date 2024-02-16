import React from 'react';

const DropdownSelectType = (props) => {
    const title = props.title;
    const handleSelect = props.handleSelect;
    const type = props.type;

    return (
        <section>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold '}}>
                {title}
            </span>
            <select onChange={handleSelect} value={type}>
                <option value='popular'>Popular</option>
                <option value='top_rated'>Top Rated</option>
            </select>
        </section>
    );
}

export default DropdownSelectType;
