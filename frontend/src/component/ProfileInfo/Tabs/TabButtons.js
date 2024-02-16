import React from 'react';

const TabButtons= (props) => {
    const { activeTab, showTab } = props;
    return (
        <section className='tab-btn-container'>
            <button
            id={`${activeTab === 'Tv Series'? 'active': ''}`}
            className='tab-btn'
            onClick={() => showTab(0)}>
                Tv Series
            </button>
            <button
            id={`${activeTab === 'Anime'? 'active': ''}`}
            className='tab-btn'
            onClick={() => showTab(1)}>
                Anime
            </button>
            <button
            id={`${activeTab === 'Movies'? 'active': ''}`}
            className='tab-btn'
            onClick={() => showTab(2)}>
                Movies
            </button>
            <button
            id={`${activeTab === 'Watch Later'? 'active': ''}`}
            className='tab-btn'
            onClick={() => showTab(3)}>
                Watch Later
            </button>
        </section>
    )
}


export default TabButtons;
