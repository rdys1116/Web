import React from 'react';
import CardContainer from '../Display-Card/CardContainer';

const MovieCollection = props => {
    return (
        <div>
            {
                props.movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <section>
                                <h4>Series Overview</h4>
                                <article>{movie.overview}</article>
                            </section>
                            {/* <section>
                                <img src={`${IMAGE_URL}${movie.poster_path}`} alt=''/>
                            </section> */}
                            <section>
                                <CardContainer movies={movie.parts}/>
                            </section>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MovieCollection;
