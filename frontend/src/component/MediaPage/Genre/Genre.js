import React from 'react';

import Loading from '../../Preloader/Loading';
import ManageGenres from './Logic/ManageGenres';
import './Genre.css';
import '../../../styles/genre.css';
import displayGenres from './helper/displayGenre';
import ErrorPage from '../../ErrorBox/ErrorPage';


const Genre = React.memo((props) => {
    const [
        selectedGenres, addGenre, removeGenre,
        isError, isLoading, genres
    ] = ManageGenres(props);


    if(isError) return ( <ErrorPage /> );

    return (
        <div id='genres'>
            {
                isLoading ?
                <Loading /> :
                (
                    <>
                        {
                            selectedGenres.length > 0 && 
                            displayGenres(selectedGenres, removeGenre, 'selected-genre')
                        }
                       
                        { displayGenres(genres, addGenre, 'genre') }
                    </>
                )
            }      
        </div>
    );
})

export default Genre;