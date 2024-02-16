import React from 'react';
import { Link } from 'react-router-dom';
import useGetActiveTab from './Logic/useGetActiveTab';

import './navbar.css';

const Navbar = () => {
    const {
        isLoggedIn, activeTab, handleActiveTab,
        showMenu, handleDisplayMenu
    } = useGetActiveTab();

    return (
        <div id='navbar'>
            <Link
            to='/home'
            onClick={handleActiveTab} >
                <span
                className={`app-name ${activeTab === 'TV Tracker' ? 'active' : ''}`}>
                    TV Tracker
                </span>
            </Link>
            <div className={`nav-links ${showMenu ? 'display-menu' : ''}`}>

                <Link
                to='/movies'
                onClick={handleActiveTab}
                className={activeTab === 'Movies' ? 'active' : ''}>
                    <span>Movies</span>
                </Link>

                <Link
                to='/tv-series'
                onClick={handleActiveTab}
                className={activeTab === 'TV Shows' ? 'active' : ''}>
                    <span>TV Shows</span>
                </Link>

                <Link
                to='/search'
                onClick={handleActiveTab}
                className={activeTab === 'Search' ? 'active' : ''}>
                    <span>Search</span>
                </Link>

                {
                    isLoggedIn &&
                    <Link
                    to={`/profile`}
                    onClick={handleActiveTab}
                    className={ activeTab === 'Profile' ? 'active' : '' }>
                        <span>Profile</span>
                    </Link>
                }

                <section className='register-section'>
                    <Link 
                    to='/user/register'
                    className='register btn'       
                    onClick={handleActiveTab}
                    id={activeTab === 'Register' ? 'btn-active' : ''}>
                        <span>Register</span>
                    </Link>

                    <Link
                    to='/user/login'
                    className='login btn'
                    onClick={handleActiveTab}
                    id={activeTab === 'Login' ? 'btn-active' : ''}>
                        <span>Login</span>
                    </Link>
                </section>
            </div>
            <div className='menu-btn'>
                <button onClick={handleDisplayMenu}>
                    {
                        showMenu ?
                        <i className='fas fa-times' /> :
                        <i className='fas fa-bars' />
                    }
                </button>
            </div>
        </div>
    );
};

export default Navbar;