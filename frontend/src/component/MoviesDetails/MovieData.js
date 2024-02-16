import React from 'react';

const MovieData = props => {
    const MovieInfo = props.media;

    return (
        <div>
            <article>
                <h2 className='section-heading'>Movie Overview</h2>
                <p>{MovieInfo.overview}</p>
            </article>
            <article>
                <p>
                    <strong>Status: </strong> 
                    {MovieInfo.status}
                </p>
                <p>
                    <strong>Release Date: </strong>
                    {MovieInfo.release_date}
                </p>
                {
                    MovieInfo.tagline === ''? null: 
                    <p>
                        <strong>Tagline: </strong>
                        {MovieInfo.tagline}
                    </p>
                }
                {/* // TODO convert ISO language code to full form (en => english) */}
                {/* <p>{MovieInfo.original_language}</p> */}
            </article>
        </div>
    );
}

export default MovieData;
