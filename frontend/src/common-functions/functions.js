import { TMDB_API_KEY, BASE_URL } from '../config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import API from './apiEndpoints';

// temporary cache in memory to avoid API calls
const cacheResponse = {};

function maintainCache(){
    const keys = Object.keys(cacheResponse)
    if(keys.length > 25){
        keys.some((key, index) => {
            delete cacheResponse[key];
            return (index === 5);
        })
    }
}

// encapsulated repeated part of TMDB url
function getFullUrl(path, pageNumber = 1, discover = null){
    if(!path) return '';

    let url = `${BASE_URL}/${path}?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNumber}`;
    
    if(discover){
        const { sortOption, genres } = discover;

        url += `&sort_by=${sortOption}&include_adult=false&include_video=false&with_genres=${genres}`;
    }

    return url;
}


function fetchData(url, setState, state){
    maintainCache();
    if(cacheResponse[url]){
        new Promise((resolve, reject) => {
            setState(cacheResponse[url]);
            if(Object.keys(cacheResponse).includes(url+'res')){
                return resolve(cacheResponse[url+'res']);
            } else{
                return reject();
            }
        })
    }

    return (
        axios.get(url)
        .then(res => {
            // state needs data from results, use case if infinite loading (media pages)
            let data = res.data.hasOwnProperty('results');

            if(data){
                console.log(res.data.results);
                setState([...state, ...res.data.results]);
                
                cacheResponse[url] = [...state, ...res.data.results];
                cacheResponse[url+'res'] = res.data;
            } else{
                console.log(res);
                setState(res.data);

                cacheResponse[url] = res.data;
            }
            return res.data;
        })
        .catch(err => setState({ isError: err }))
    );
}



// custom hook for getting data
function useFetchData(url){
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        if(url === '') return ( setIsError(false), setIsLoading(false), setFetchedData(null) );

        if(url.includes(null) || url.includes(undefined)){
            return ( setIsError(true), setIsLoading(false), setFetchedData([]) );
        }

        setIsLoading(true);

        if(cacheResponse[url]){
            console.log('cacheResponse');
            console.log(cacheResponse[url]);

            setFetchedData(cacheResponse[url]);
            setIsLoading(false);
        } else{
            axios.get(url)
            .then(res => {
                console.log(res.data)
                if(res.data.isError) return ( setIsError(true), setIsLoading(false), setFetchedData([]) );

                const hasResults = res.data.hasOwnProperty('results');
    
                if(hasResults){
                    setFetchedData(res.data.results);
                    cacheResponse[url] = res.data.results;
                    
                } else {
                    setFetchedData(res.data);
                }

                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsError(true);
            });
        }

    }, [url]);

    return [
        isError, isLoading, fetchedData
    ];
}

// enables netflix scroll by taking flags and returning appropriate classes
function netflixScroll(classNameIndex, enable=false){
    if(enable){
        const netflixScroll = [
            'card-section-heading', 'netflix-style-load-button', 'netflix-card-section',
            'netflix-card-container', 'cards'
        ]
        return netflixScroll[classNameIndex]; 
    } else {
        const gridDisplay = [
            'card-section-heading', 'load-button', 'display-card-section',
            'card-container', null
        ]
        return gridDisplay[classNameIndex];
    }
}


// fetch tracked media from database and sets in the local storage for so that
// API calls can be made if any media is being tracked
function saveWatchedMediaIds(a='a'){
    console.log(a);
    const userId = localStorage.getItem('userId');

    if(!userId) return;

    axios.get(`${API.trackList.list}/${userId}`)
    .then((res) => {
        console.log('fetched');
        let mediaIdList = [];
        console.log(res);

        res.data.movies_tracked.forEach((movies) => {
            mediaIdList.push(movies.movie_id);
        });
        
        res.data.tv_series_tracked.forEach((series) => {
            mediaIdList.push(series.series_id);
        });

        res.data.anime_tracked.forEach((anime) => {
            mediaIdList.push(anime.series_id);
        });
        
        localStorage.setItem('watchedMediaIds', [...mediaIdList]);
    })
    .catch(err => console.log(err));
}

function saveWishMediaIds(){
    const userId = localStorage.getItem('userId');
    if(!userId) return;

    axios.get(`${API.wishList.get}/${userId}`)
    .then((res) => {
        console.log(res.data);

        const mediaIdList = [];

        res.data.wish_list.forEach((media) => {
            mediaIdList.push(media.media_id);
        });
        
        localStorage.setItem('savedMediaIds', [...mediaIdList]);
    })
    .catch((err) => console.log(err));
}




// checks if the passed media object is anime or not by returning boolean
function isItAnime(animeDetails){
    // separate if statements so that each condition will be checked
    let checkConditions = 0;

    if(animeDetails.genre_ids){
        animeDetails.genre_ids.forEach(genre => {
            if(genre === 16){
                ++checkConditions;
            }
        })
    }
    
    if(animeDetails.origin_country){
        animeDetails.origin_country.forEach(country => {
            if(country === 'JP'){
                ++checkConditions;
            }
        })
    }

    if(animeDetails.original_language === 'ja'){
        ++checkConditions;
    }

    if(animeDetails.episode_run_time){
        animeDetails.episode_run_time.forEach(time => {
            if(time <= 30){
                ++checkConditions;
            }
        })
    }

    return (checkConditions >= 3);
}

export {
    getFullUrl,
    fetchData,
    useFetchData,
    netflixScroll,
    saveWatchedMediaIds,
    saveWishMediaIds,
    isItAnime
};