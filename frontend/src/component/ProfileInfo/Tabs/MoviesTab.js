import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../../config';
import Card from '../../Display-Card/Card/Card';
import Analytics from '../Analytics';

const MoviesTab = React.memo((props) => {
    const { movies, watchMinutes } = props;
    let collection;
    
    return (
        <section>
            <h1>{ `Tracked Movies (${movies.length})` }</h1>
            <Analytics watchMinutes={ watchMinutes } />
            {
                movies.map(movie => {
                    return (
                        <React.Fragment key={movie.movie_id}>

                            
                            {
                                movie.collection_details[0] &&
                                collection !== movie.collection_details[0].name &&
                                <h3>
                                    {
                                        collection = collection !== movie.collection_details[0].name? 
                                        movie.collection_details[0].name: null
                                    }
                                </h3>
                            }
                            {
                                movie.collection_details[0] === null &&
                                collection !== 'Stand Alone Movies' &&
                                <h3>
                                    {
                                        collection = collection !== 'Stand Alone Movies' ? 
                                        'Stand Alone Movies' : null
                                    }
                                </h3>
                            }
                            <section className='tv-show-cards'>
                                <Link
                                to={`/movie/${movie.movie_id}`}
                                style={{ textDecoration: 'none'}} >

                                    <Card
                                    image={`${IMAGE_URL}/${movie.poster}`}
                                    title={{
                                        text: movie.name,
                                        sizeLimit: ( window.innerWidth < 1100 ? 12 : 20 )
                                    }}
                                    />

                                </Link>
                            </section>
                        </React.Fragment>
                    )
                })
            }
        </section>
    )
});

export default MoviesTab;
