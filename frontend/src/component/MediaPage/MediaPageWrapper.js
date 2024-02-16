import React from 'react';
import ErrorPage from '../ErrorBox/ErrorPage';
import useFetchAndManageMediaData from './Logic/getMediaData';
import MediaPage from './MediaPage';

const MediaPageWrapper = (props) => {
    const {
        urlDetails, sortOptions, genreUrlPath, heading
    } = props;
    
    const [
        movies, isDataEmpty, metaData,
        setGenres, handleDropDown,
        handleClick, loadMore
    ] = useFetchAndManageMediaData(urlDetails);

    if(movies.isError) return ( <ErrorPage /> );

    return (
        <MediaPage
        genres = {{ setGenres: setGenres, url: genreUrlPath }}
        dropDown = {{ options: sortOptions, handleDropDown: handleDropDown }}
        mediaData = { movies }
        metaData = { metaData }
        isDataEmpty = { isDataEmpty }
        loadMoreBtn = {{ onClick: handleClick, infiniteScroll: loadMore }}
        heading={heading}
        />
    )
}

export default MediaPageWrapper;
