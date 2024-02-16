import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../frontend/src/config';

import CardContainer from '../../frontend/src/component/Display-Card/CardContainer';
import { fetchData, getUrl } from '../../frontend/src/common-functions/functions';


// variables for dynamic content loading
let pageNumber = 1;

const TvSeries = props => {
    const [TvSeries, setTvSeries] = useState([]);
    const saveData = useRef({
        tvSeries: [],
        anime: [],
        type: props.location.state || 'popular'
    });

    // fetch after 1st render
    useEffect(() => {
        saveData.current.tvSeries = [];
        pageNumber = 1;
        fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
    }, [saveData.current.type]);

    // save the state so it is not lost when passed in child component
    useEffect(() => {
        // for (let i = 0; i < TvSeries.length; i++) {
        //     const element = TvSeries[i];
        //     console.log(element)
        //     console.log( isItAnime(element))
        // }
        saveData.current.tvSeries = [...saveData.current.tvSeries, ...TvSeries];
    },[TvSeries]);

    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if(pageNumber !== 1) fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
                ++pageNumber;
            }
        })
        if(node) observer.current.observe(node);
    }, []);

    
    // click functionality which fetch more movies
    const handleClick = () => {
        ++pageNumber;
        fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
    }
    const handleSelect = e => {
        saveData.current.type = e.target.value;
        setTvSeries([]);
    }

    return (
        <div>
            <section>
                <h1>Tv Shows And Anime</h1>
                <select onChange={handleSelect} value={saveData.current.type}>
                    <option value='popular'>Popular</option>
                    <option value='top_rated'>Top Rated</option>
                </select>
            </section>
            {
                TvSeries && <CardContainer
                movies={[...saveData.current.tvSeries, ...TvSeries]}
                button={{
                    onClick: handleClick,
                    ref: callBackForLoadingMore,
                    text: 'Load More'
                }}
                    />
            }   
            
        </div>
    );
}

export default TvSeries;
