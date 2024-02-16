import { useState, useEffect } from 'react';
import { fetchData, getUrl, getWatchedMedia } from '../../../frontend/src/common-functions/functions';

let pageNumber = 1;

function useFetchPageDetails(){
    
    // state for all the fetched movies
    const [backGroundPoster, setBackGroundPoster] = useState();
    const [PopularMovies, setPopularMovies] = useState([]);
    const [TopRatedMovies, setTopRatedMovies] = useState([]);
    const [PopularTvShow, setPopularTvShow] = useState([]);
    const [TopRatedTvShow, setTopRatedTvShow] = useState([]);

    // assign all the variables the value of pageNumber so that each type's next page can be fetched
    let [
        pgPopularMovie,
        pgTopRatedMovies,
        pgPopularTvShow,
        pgTopRatedTvShow
    ] = Array(4).fill(pageNumber);

    // fetch after 1st render
    useEffect(() => {
        fetchData(getUrl(pageNumber, 'tv/60735'), setBackGroundPoster, backGroundPoster);
        fetchData(getUrl(pageNumber, 'movie/popular'), setPopularMovies, PopularMovies);
        fetchData(getUrl(pageNumber, 'movie/top_rated'), setTopRatedMovies, TopRatedMovies);
        fetchData(getUrl(pageNumber, 'tv/popular'), setPopularTvShow, PopularTvShow);
        fetchData(getUrl(pageNumber, 'tv/top_rated'), setTopRatedTvShow, TopRatedTvShow);
        
        // stores users tracked movies and saves it id in localStorage
        getWatchedMedia();
    }, []);
    
    // click functionality which fetch more movies
    function loadMoreOnClick(e){
        let name = e.target.getAttribute('name');
        if(name === 'movie/popular'){

            pgPopularMovie =+ 1;
            fetchData(getUrl(pgPopularMovie, name), setPopularMovies, PopularMovies);

        } else if(name === 'movie/top_rated'){
        
            pgTopRatedMovies =+ 1;
            fetchData(getUrl(++pgTopRatedMovies, name), setTopRatedMovies, TopRatedMovies);
        
        } else if(name === 'tv/popular'){
            
            pgPopularTvShow =+ 1;
            fetchData(getUrl(++pgPopularTvShow, name), setPopularTvShow, PopularTvShow);
        
        } else if(name === 'tv/top_rated'){
        
            pgTopRatedTvShow =+ 1;
            fetchData(getUrl(++pgTopRatedTvShow, name), setTopRatedTvShow, TopRatedTvShow);
        
        }
    }

    // array which will render the landing page by mapping each object
    // this object is the best way i can think of which can reduce the repetition of same elements with 
    // minute changes 
    const sections = [
        {
            link: {
                pathname: '/movies',
                state: 'popular',
                title: 'Popular Movies'
            },
            movies: [...PopularMovies],
            name: 'movie/popular'
        },
        {
            link: {
                pathname: "/movies",
                state: 'top_rated',
                title: 'Top Rated Movies'
            },
            movies: [...TopRatedMovies],
            name: 'movie/top_rated'
        },
        {
            link: {
                pathname: "/tv",
                state: 'popular',
                title: 'Popular Tv Shows'
            },
            movies: [...PopularTvShow],
            name: 'tv/popular'
        },
        {
            link: {
                pathname: "/tv",
                state: 'top_rated',
                title: 'Top Rated Tv Shows'
            },
            movies: [...TopRatedTvShow],
            name: 'tv/top_rated'
        },
    ];
    if(
        !backGroundPoster &&
        PopularMovies.length === 0 &&
        TopRatedMovies.length === 0 &&
        PopularTvShow.length === 0 &&
        TopRatedTvShow.length === 0
    ){
        return [null, null, null]
    }
    
    return [backGroundPoster, loadMoreOnClick, sections];
}


export default useFetchPageDetails;