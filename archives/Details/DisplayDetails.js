import React from 'react';

const Display = props => {
    return (
        <div className='details'>
            <h1>{props.details.name}</h1>
            <section>
                {props.details.genres.map(genre => {
                    return <span key={genre.id}>{genre.name}</span>;
                })}
            </section>
            <article>
                {props.details.overview}
            </article>
            <article>
                <p>{props.details.status}</p>
                <p>{props.details.original_language}</p>
            </article>
        </div>
    )
}


export default Display;
