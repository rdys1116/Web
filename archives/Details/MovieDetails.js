import React,{ useEffect, useState } from 'react';
import { IMAGE_URL } from '../../frontend/src/config';
import MainImage from '../../frontend/src/component/MainImage/MainImage';


// import MovieCollection from './CollectionDetails';
import CardContainer from '../../frontend/src/component/Display-Card/CardContainer';
import { fetchData, getUrl } from '../../frontend/src/common-functions/functions';
import './details.css';

let pageNumber = 1;
const Display = props => {
    return (
        <div className='details'>
            <h1>{
                props.details.name ||
                props.details.title ||
                props.details.original_name ||
                props.details.original_title
            }</h1>
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
let currentMovieId;


function MovieDetails(props) {
    const [MovieInfo, setMovieInfo] = useState();
    const [Collection, setCollection] = useState();
    const [SimilarMovies, setSimilarMovies] = useState([]);
    // const similarMovies = useRef([]);
    const movieId = props.match.params.id;
    useEffect(() => {
        if(currentMovieId === undefined) {
            return currentMovieId = movieId;
        }
        if(currentMovieId !== movieId){
            window.location.reload();
        }
        currentMovieId = movieId
    }, [movieId])

    useEffect(() => {
        fetchData(
            getUrl(pageNumber,`movie/${movieId}`),
            setMovieInfo,
            MovieInfo
        )
        }, []);
        
    useEffect(() => {
        // similarMovies.current = [...similarMovies.current, ...SimilarMovies];
        if(MovieInfo){
            if(MovieInfo.belongs_to_collection){
                const id = MovieInfo.belongs_to_collection.id;
                console.log(id);
                fetchData(
                    getUrl(pageNumber,`collection/${id}`),
                    setCollection,
                    Collection
                )
            }       
        }
    }, [MovieInfo]);

    useEffect(() => {
        console.log(SimilarMovies)
        if(MovieInfo){
            fetchData(
                getUrl(pageNumber, `movie/${movieId}/similar`),
                setSimilarMovies,
                SimilarMovies
            )
        }
    }, [MovieInfo]);

    // click functionality which fetch more movies
    const loadMore = () => {
        ++pageNumber;
        fetchData(getUrl(pageNumber, `movie/${movieId}/similar`), setSimilarMovies, SimilarMovies);
    }
    
    return (
        <div>
            {
                MovieInfo &&
                <div>
                    <MainImage image={`${IMAGE_URL}${MovieInfo.backdrop_path}`} />
                </div>      
            }
            {
                MovieInfo &&
                <div className='details'>
                    <section>
                        <h1 className='movie-title'>
                            {MovieInfo.name || MovieInfo.title || MovieInfo.original_name || MovieInfo.original_title}
                        </h1>
                        {MovieInfo.genres.map(genre => {
                            return <span className={`${genre.name} genre-tag`} key={genre.id}>{genre.name}</span>;
                        })}
                    </section>
                    <article>
                        <h2 className='section-heading'>Movie Overview</h2>
                        <p>{MovieInfo.overview}</p>
                    </article>
                    <article>
                        <p><strong>Status: </strong> {MovieInfo.status}</p>
                        <p><strong>Release Date: </strong> {MovieInfo.release_date}</p>
                        {MovieInfo.tagline === ''? null: 
                            <p><strong>Tagline: </strong> {MovieInfo.tagline}</p>}
                        {/* // TODO convert ISO language code to full form (en => english) */}
                        {/* <p>{MovieInfo.original_language}</p> */}
                    </article>
                    <article>
                        {MovieInfo.belongs_to_collection ? <h2 className='section-heading'>{MovieInfo.belongs_to_collection.name}</h2>: null}
                        {/* {console.log(Collection)} */}
                        {
                            Collection && 
                            <section className='collection-info'>
                                <div className='poster-details-box'>
                                    <img className='collection-poster' src={`${IMAGE_URL}${Collection.poster_path}`} alt={Collection.name}/>
                                    <article className='collection-overview'>
                                        <p className='collection-parts-count'>{`Total Parts: ${Collection.parts.length}`}</p>
                                        {Collection.overview}
                                    </article>
                                </div>
                            </section>
                            
                        }
                    </article>
                    <section>
                        {
                            SimilarMovies && <CardContainer
                            heading={{
                                text: 'Similar Movie', 
                                size: '2rem',
                                margin: '0'
                            }}
                            movies={[...SimilarMovies]}
                            netflixScroll = {true}
                            button={{
                                onClick: loadMore,
                                text: <i className="fas fa-angle-double-right"></i>
                            }}
                            />
                        }
                    </section>
                </div>
            }
        </div>
    );
};

export default MovieDetails;
