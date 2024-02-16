import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../common-functions/apiEndpoints";

export default function useHandleMovieTrack(movie){
    const [isTracked, setIsTracked] = useState(false);
    
    useEffect(() => {
        const watchedList = localStorage.getItem('watchedMediaIds') ?
            localStorage.getItem('watchedMediaIds').split(',') : [];
        setIsTracked(watchedList.includes(movie.id.toString()));
    }, []);

    function handleTrackedBtn(){
        const state = !isTracked;
        if(state){
            trackMovies(movie);
        } else {
            removeTrackedMovie(movie.id);
        }
        setIsTracked(state);
    }
    
    return [
        handleTrackedBtn,
        isTracked
    ];
}


function removeTrackedMovie(id){
    const listItems = { 
        userId: localStorage.getItem('userId'),
        movie_id: id
    };
    let watchedList = localStorage.getItem('watchedMediaIds') ?
    localStorage.getItem('watchedMediaIds').split(',') : [];
    
    axios.post(API.trackList.untrackMovie, listItems)
    .then(res => {
        console.log(res.data);
        let isFiltered;
        watchedList = watchedList.filter(movieId => {
            isFiltered = (movieId === id.toString());
            return !isFiltered;
        });
        
        if(isFiltered) localStorage.setItem('watchedMediaIds', [...watchedList]);
    })
    .catch(err => console.log(err));
}

function trackMovies(movie){
    let watchedList = localStorage.getItem('watchedMediaIds') ?
    localStorage.getItem('watchedMediaIds').split(',') : [];

    const data = {
        userId :  localStorage.getItem('userId'),
        name: movie.name || movie.title || movie.original_name || movie.original_title,
        poster: movie.poster_path,
        movie_id: movie.id,
        watched_time: movie.runtime,
    }
    if(movie.belongs_to_collection){
        data.collection = {
            id: movie.belongs_to_collection.id,
            name: movie.belongs_to_collection.name,
        }
    }
    console.log(data)
    
    axios.post(API.trackList.trackMovie, data)
    .then(res => {
        console.log(res)
        if(!watchedList.includes(movie.id.toString())){
            watchedList.push(movie.id);
            localStorage.setItem('watchedMediaIds', [...watchedList]);
        }
    })
    .catch(err => console.log(err));
}