import React from 'react';
import { Link } from 'react-router-dom';
import useGetActiveTab from '../Logic/useGetActiveTab';

const MobileNav = () => {
    const {
        isLoggedIn, activeTab, handleActiveTab
    } = useGetActiveTab();

    return (
        <div id='mobile-nav'>
            
            <Link
            to='/home'
            onClick={handleActiveTab}
            className={activeTab === 'TV Tracker' ? 'active-footer-link' : ''}>
                <i className='fas fa-fire'/>
            </Link>

            <Link
            to='/movies'
            onClick={handleActiveTab}
            className={activeTab === 'Movies' ? 'active-footer-link' : ''}>
                <i className='fas fa-film' />
            </Link>

            <Link
            to='/tv-series'
            onClick={handleActiveTab}
            className={activeTab === 'TV Shows' ? 'active-footer-link' : ''}>
                <i className='fas fa-tv' />
            </Link>

            <Link
            to='/search'
            onClick={handleActiveTab}
            className={activeTab === 'Search' ? 'active-footer-link' : ''}>
                <i className='fas fa-search' />
            </Link>

            {
                isLoggedIn &&
                <Link
                to={`/profile`}
                onClick={handleActiveTab}
                className={ activeTab === 'Profile' ? 'active-footer-link' : '' }>
                    <i className='fas fa-user-circle' />
                </Link>
            }
        </div>
    );
}

export default MobileNav;
