import React from 'react';
import '../../styles/genre.css'

// component which displays movie or tv show name and below it its genre(s)
const MediaHeadingWithGenre = props => {
    const mediaInfo = props.media;

    return (
        <section>
            <h1 className='movie-title'>
                {
                    mediaInfo.name || mediaInfo.title ||
                    mediaInfo.original_name ||
                    mediaInfo.original_title
                }
            </h1>
            {
                mediaInfo.genres.map(genre => {
                    return (
                        <span className={`genre genre-${genre.id}`} key={genre.id}>
                            {genre.name}
                        </span>
                    )
                })
            }
        </section>
    )
}

export default MediaHeadingWithGenre;