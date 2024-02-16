import React from 'react';

const Analytics = (props) => {
    const { watchMinutes } = props;
    
    const watchHours = Math.floor(watchMinutes / 60);
    
    return (
        <div style={{ margin: '10px' }}>
            <p>{ `Total Watch Hours: ${watchHours}` }</p>
        </div>
    );
}

export default Analytics;
