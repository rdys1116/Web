import React from 'react';

const ProfileDetails = (props) => {
    const { name } = props;

    return (
        <div>
            <h1>{ name }</h1>
        </div>
    );
}

export default ProfileDetails;
