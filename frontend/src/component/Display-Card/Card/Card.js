import React, { useEffect, useRef, useState } from 'react'

import Loading from '../../Preloader/Loading';
import './Card.css';

function useImageLoaded(imagePath){
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(imagePath.includes(null)) handleLoad();
    }, [imagePath]);

    function handleLoad(){
        setIsLoaded(true);
    }
    return [isLoaded, handleLoad, setIsLoaded];
}

// component which displays a poster and name as most basic feature
// adds anime tag band and shows the release year when passed appropriate props
const Card = (props) => {
    const {
        title, netflixScroll, isAnime,
        image, children, mediaType
    } = props;
    
    const [
        isLoaded, handleLoad
    ] = useImageLoaded(image);

    let name = ( title.text.length >= (title.sizeLimit || 35) ) ?
        title.text.slice(0, title.sizeLimit || 32)+'...' : title.text;

    return (
        <div className={(netflixScroll || false) ? 'netflix-card' : 'card'}>
            {
                (isAnime) ?
                <h1 className='animeTag'>Anime</h1> : 
                null
            }

            { !isLoaded && image && <Loading /> }

            <img
            src={image}
            style={isLoaded ? {} : { visibility: 'none', width: '0' }}
            onLoad={handleLoad}
            className='card-poster'
            alt={title.text}
            loading='lazy' />
            
            <section className='tv-show-card-details card-details'>
                <h4 className={title.titleClassName || 'card-title'}>
                    {
                        title.year ? 
                        `${name} (${title.year})` : 
                        name
                    }
                </h4>
            
                {children || mediaType}
            </section>
        </div>
    )
}

export default Card;
