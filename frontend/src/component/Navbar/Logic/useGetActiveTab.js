import { useEffect, useState } from 'react';

function useGetActiveTab(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const isLogged = localStorage.getItem('userId');    
        setIsLoggedIn(isLogged ? true : false);

        const tabs = [
            {includes: 'home', name: 'TV Tracker'},
            {includes: 'movie', name: 'Movies'},
            {includes: 'tv', name: 'TV Shows'},
            {includes: 'search', name: 'Search'},
            {includes: 'profile', name: 'Profile'},
            {includes: 'login', name: 'Login'},
            {includes: 'register', name: 'Register'},
        ];

        let activePage = '' 
        tabs.every((tab) => {
            if(window.location.href.includes(tab.includes)){
                activePage = tab.name;
            }
            return activePage === '';
        });
        console.log(activePage)
        
        setActiveTab(activePage);
    }, [activeTab]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMenu(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showMenu]);

    function handleActiveTab(e){
        console.log(e.target.innerText);
        setActiveTab(e.target.innerText);
    }

    function handleDisplayMenu(){
        setShowMenu(!showMenu);
    }

    return {
        isLoggedIn, activeTab, handleActiveTab,
        showMenu, handleDisplayMenu
    };
}

export default useGetActiveTab;
