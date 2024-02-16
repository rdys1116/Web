import { useEffect, useState, useRef, useCallback } from 'react';

import { fetchData, getFullUrl } from '../frontend/src/common-functions/functions';

// variables for dynamic content loading
let pageNumber = 1;

function useFetchMediaData(media, type){
    const [mediaData, setMediaData] = useState([]);
    const saveData = useRef({
        mediaData: [],
        type: type || 'popular'
    });
    
    // fetch after 1st render or when type changes
    // the ref is used to re render when similar tv series are clicked
    // when clicked on similar series card, the url in browser changes but rendering doesn't happens
    // this is the work around i found
    useEffect(() => {
        // resets the saved list to blank and page number to 1
        saveData.current.mediaData = [];
        pageNumber = 1;
        fetchData(getFullUrl(`${media}/${saveData.current.type}`, pageNumber), setMediaData, mediaData);
   
    }, [saveData.current.type]);
    
    // save the state so it is not lost when passed in child component
    // for some reason the state is cleared so this ref is used to store value
    useEffect(() => {
        saveData.current.mediaData = [...saveData.current.mediaData, ...mediaData];
    },[mediaData]);
    
    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if(pageNumber !== 1) fetchData(getFullUrl(`${media}/${saveData.current.type}`, pageNumber), setMediaData, mediaData);
                ++pageNumber;
            }
        })
        
        if(node) observer.current.observe(node);
    }, []);
    
    
    // click functionality which fetch more movies
    const handleClick = () => {
        
        ++pageNumber;
        fetchData(getFullUrl(`${media}/${saveData.current.type}`, pageNumber), setMediaData, mediaData);
        
    }
    const handleSelect = e => {
        
        saveData.current.type = e.target.value;
        setMediaData([]);
        
    }
    if(mediaData <= 0){
        return []
    }
    return [
        [...saveData.current.mediaData, ...mediaData],
        saveData.current.type,
        handleSelect,
        handleClick,
        callBackForLoadingMore
    ]

}

export default useFetchMediaData;