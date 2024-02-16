import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../config';
import './CardContainer.css';

import Card from './Card/Card';
import { isItAnime, netflixScroll } from '../../common-functions/functions';

// returns a section containing cards(made for 20 cards at time) with heading if passed
// responsive and can enable netflix like scroll property with props
const CardContainer = React.memo((props) => {
    const {
        heading, enableNetflixScroll,
        movies, button
    } = props;
    
    const isNetflixScrollEnable = enableNetflixScroll || false;

    const watchedMediaIds = (localStorage.getItem('watchedMediaIds')) ?
        [...localStorage.getItem('watchedMediaIds').split(',')] : [];

    return (
        <section className={netflixScroll(2, isNetflixScrollEnable)}>
            {
                (heading) ?
                (
                    <h2 style={{
                        fontSize: heading.size || '4.5vw',
                        margin: heading.margin || '1rem'
                    }}
                    className={netflixScroll(0, isNetflixScrollEnable)}>
        
                        {heading.text}
        
                    </h2>
                ) :
                null
            }

            <div className={netflixScroll(3, isNetflixScrollEnable)}>
                {
                    movies.map((movie) => {
                        let media_type = movie.release_date ? 'movie': 'tv';
                        let year;

                        if(movie.first_air_date || movie.release_date){
                            year = media_type==='movie' ? movie.release_date.slice(0, 4): movie.first_air_date.slice(0, 4);
                        }
                        
                        return (
                            <Link 
                            to={`/${media_type}/${movie.id}`}
                            key={movie.id}
                            style={{ textDecoration: 'none'}}
                            className={netflixScroll(4, isNetflixScrollEnable)}>
                                
                                <Card
                                image={`${IMAGE_URL}${movie.poster_path}`}
                                title={{
                                    text: (movie.name || movie.title || movie.original_name || movie.original_title),
                                    year: year? year: 'N/A'
                                }}
                                isAnime={media_type === 'tv' && isItAnime(movie)}
                                netflixScroll={isNetflixScrollEnable}
                                details={movie}
                                mediaType={movie.media_type}
                                watched={watchedMediaIds}
                                />
                            
                            </Link>
                        );
                    })
                }

                {
                    (button) ?
                    (
                        <div className={netflixScroll(1,isNetflixScrollEnable)}>
                            <button
                            onClick={button.onClick}
                            ref={button.ref}>
            
                                {button.text}
                            
                            </button>
                        </div>
                    ) :
                    null
                }
            </div>

        </section>
    );
});

export default CardContainer;