import React from 'react';
import useSimilarMedia from './LogicHook/fetchSimilarMedia';
import CardContainer from '../Display-Card/CardContainer';
import Loading from '../Preloader/Loading';

const SimilarMedia = (props) => {
    const [
        SimilarShows, isAnime, loadMore
    ] = useSimilarMedia(props.media, props.type);
    
    const title = props.type === 'tv'?
        `Similar ${isAnime.current? 'Anime': 'Tv Show'}` :
        `Similar Movies`
    
    return (
        <>
            {
                !SimilarShows ?
                <Loading /> :
                (
                    <CardContainer
                    heading={{
                        text: title, 
                        size: '2rem',
                        margin: '0'
                    }}
                    movies={[ ...SimilarShows ]}
                    button={{
                        onClick: loadMore,
                        text: (<i className="fas fa-angle-double-right" />)
                    }}
                    enableNetflixScroll
                    />
                ) 
            }
        </>
    )
}

export default SimilarMedia;
