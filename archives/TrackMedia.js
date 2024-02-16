import React, { useState, useEffect } from 'react';

const TrackButton = props => {
    const [IsTracked, setIsTracked] = useState( props.tracked);
    console.log(props)
    useEffect(() => {
        setIsTracked(!IsTracked);
        console.count()
    }, [props])
    return (
        <div className={props.className}>
            <button className='watchedIcon' onClick={props.handleTracked}>
                {
                    IsTracked? 'tracked': 'track'
                }
            </button>
            {/* <button className='watchedIcon' onClick={props.handleCompleted}>
                {
                    Completed?
                    <i className="fas fa-check-circle"></i>:
                    <i className="far fa-check-circle"></i>
                }
            </button> */}
        </div>
    );
}

export default TrackButton;

























// import React,{ useEffect, useRef, useState } from 'react';
// import { TVDB_API_KEY, BASE_URL, IMAGE_URL } from '../../config';
// import axios from 'axios';

// import WatchedButton from '../Display-Card/Watched';
// import WatchLater from '../Display-Card/WatchLater';
// import MainImage from '../Poster/MainImage';
// import CardContainer from '../Display-Card/CardContainer';
// import { fetchData, getUrl } from '../../common-functions/functions';
// import './TvShowDetails.css';

// let pageNumber = 1, currentTvId;

// const TvShowDetails = (props) => {
//     const [TvInfo, setTvInfo] = useState();
//     const [SimilarShows, setSimilarShows] = useState([]);
//     const [Season, setSeason] = useState({});
//     const [EpisodeInfo, setEpisodeInfo] = useState({});
//     const [Update, setUpdate] = useState(false);
    
//     const [RefChanged, setChangeRef] = useState();
//     const [AllDone, setAllDone] = useState(false);
//     const [WatchedEpisodes, setWatchedEpisodes] = useState({});

//     const tvId = props.match.params.id;

//     let isAnime = useRef(false);
//     let watchStatus = useRef([]);

//     useEffect(() => {
//         if(currentTvId === undefined) {
//             return currentTvId = tvId;
//         }
//         if(currentTvId !== tvId){
//             window.location.reload();
//         }
//         currentTvId = tvId
//     }, [tvId])

//     useEffect(() => {
//         fetchData(
//             getUrl(1, `tv/${tvId}`),
//             setTvInfo,
//             TvInfo
//         );
//     }, []);

//     useEffect(() => {
//         // console.log(SimilarShows)
//         if(TvInfo){
//             // fetchData(
//             //     getUrl(pageNumber, `tv/${tvId}/similar`),
//             //     setSimilarShows,
//             //     SimilarShows
//             // )
//             watchStatus.current = [];
//             for (let i = 0; i < TvInfo.seasons.length; i++) {
//                 watchStatus.current.push({
//                     name: TvInfo.seasons[i].name,
//                     allDone: false,
//                     episodesDone: Array(TvInfo.seasons[i].episode_count).fill(false)
//                 });
//             }
//             setChangeRef(true);
//             console.log(watchStatus);
//         }
//     }, [TvInfo]);

//     useEffect(() => {
//         setEpisodeInfo({
//             season_number: Season.season_number,
//             info: Season
//         })
//     }, [Season])

//     useEffect(() => {
//         let checkConditions = 0;
//         if(TvInfo){
//             TvInfo.genres.forEach(genre => {
//                 if(genre.id === 16){
//                     ++checkConditions;
//                 }
//             })
//             TvInfo.origin_country.forEach(country => {
//                 if(country === 'JP'){
//                     ++checkConditions;
//                 }
//             })
//             if(TvInfo.original_language === 'ja'){
//                 ++checkConditions;
//             }
//             TvInfo.episode_run_time.forEach(time => {
//                 if(time <= 30){
//                     ++checkConditions;
//                 }
//             })
//             if(checkConditions === 4){
//                 isAnime.current = true;
//             }
//         }
//     }, [TvInfo]);

//     const displaySeasonInfo = (season_number, e) => {
//         // console.log(season_number, e)
//         // tv/{tv_id}/season/{season_number}
//         if(e.target.type === 'checkbox'){
//             return
//         }
//         if(EpisodeInfo.season_number === season_number){
//             return setEpisodeInfo({
//                 season_number: null,
//                 info: null
//             })
//         }
//         if(season_number.toString()){
//             fetch(getUrl(1, `tv/${tvId}/season/${season_number}`))
//                 .then(res => res.json())
//                 .then(res => {
//                     console.log(res)
//                     setSeason(res)
//                 })
//                 .catch(err => console.log(err));
//         } else {
//             setSeason([])
//         }

//         console.log(Season);
//         console.log(EpisodeInfo);
//     }
//     const selectAll = () => {
//         // setAllDone(!AllDone);
//         // updateRef
//         for (let i = 0; i < TvInfo.seasons.length; i++) {
//             watchStatus.current[i].allDone = !WatchedEpisodes.completed;
//             watchStatus.current[i].episodesDone = Array(TvInfo.seasons[i].episode_count).fill(!WatchedEpisodes.completed);
//         }
//         let allWatched;
//         if(!WatchedEpisodes.completed){
//             allWatched = {
//                 completed: true,
//                 tracked: true,
//                 name: TvInfo.seasons[TvInfo.seasons.length - 1].name,
//                 episodes: TvInfo.seasons[TvInfo.seasons.length - 1].episode_count
//             }
//         } else{
//             allWatched = {
//                 completed: false,
//                 tracked: false,
//                 name: '',
//                 episodes: 0
//             }

//         }
//         setWatchedEpisodes(allWatched);
//     }
//     useEffect(() => {
//         if(TvInfo){
//             const trackedSeries = localStorage.getItem('watchedMediaIds').split(',');
//             console.log(trackedSeries);
//             if(trackedSeries.includes(TvInfo.id.toString())){
//                 axios.get('/list/getTrackedSeries', { params: { seriesId: TvInfo.id }})
//                     .then(res => {
//                         console.log(res.data);
//                         if(res.data.series_id){
//                             if(res.data.completed_series){
//                                 selectAll();
//                             } else{
//                                 const watchedEpisodes = {
//                                     completed: false,
//                                     tracked: true,
//                                     name: res.data.last_watched_episode[0].name,
//                                     episodes: res.data.last_watched_episode[0].episodes_watched
//                                 }
//                                 setWatchedEpisodes(watchedEpisodes);
//                                 // setAllDone(false);
//                             }
//                         }
//                     })
//             }
//         }
//     }, [TvInfo]);

//     const handleSelect = (index, name, e) => {
//         console.log(index, name, e.target)
//         let array, state, isComplete = null;
//         for (let i = 0; i < TvInfo.seasons.length; ++i) {
//             watchStatus.current[i].allDone = false;
//             watchStatus.current[i].episodesDone = Array(TvInfo.seasons[i].episode_count).fill(false)
//         }
//         if(name === e.target.name){
//             for(let j=0; j<index+1; ++j){
//                 array = watchStatus.current[j];
//                 state = !watchStatus.current[index].allDone;
//                 array.episodesDone = Array(array.episodesDone.length).fill(state);
//                 array.allDone = state;
//             }
//         }
//         if(name.includes('episode')){
//             let [episodes, season] = name.split(' ');
//             for (let i = 0; i < season; ++i) {
//                 watchStatus.current[i].allDone = true;
//                 watchStatus.current[i].episodesDone = Array(TvInfo.seasons[i].episode_count).fill(true)
//             }
//             for(let i=0; i<index+1; ++i){
//                 watchStatus.current[season].episodesDone[i] = true;
//             }
//             if(watchStatus.current[season].episodesDone.every(value => value === true)){
//                 watchStatus.current[season].allDone = true;
//             }
//             index = season;
//         }
        
//         // if(watchStatus.current[watchStatus.current.length-1].allDone === true){
//         //     isComplete = true;
//         // } else {
//         //     if(watchStatus.current[watchStatus.current.length-1].allDone === false){
//         //         isComplete = false;
//         //     }
//         // }
//         // if(isComplete === false || isComplete === true){
//         //     console.log(isComplete);
//         //     // setAllDone(isComplete);
//         //     setUpdate(isComplete.toString());
//         // }
//         let counter = 0, episodesWatched;
//         watchStatus.current.forEach(series => {
//             const lastWatchedEpisode = series.episodesDone.lastIndexOf(true);
//             if(lastWatchedEpisode > 0){
//                 episodesWatched = {
//                     completed: false,
//                     name: watchStatus.current[counter].name,
//                     episodes: lastWatchedEpisode
//                 }
//             }
//             ++counter;
//         })
//         setWatchedEpisodes(episodesWatched);
//         setChangeRef(e.timeStamp);
//         // isComplete = null;
//     }

//     const loadMore = () => {
//         ++pageNumber;
//         fetchData(getUrl(pageNumber, `tv/${tvId}/similar`), setSimilarShows, SimilarShows);
//     }
//     let latestEpisode, averageRunTime = 0;

//     if(TvInfo){
//         if(TvInfo.status === 'Ended'){
//             latestEpisode = (
//                 <section>
//                     <p><strong>Last Aired On: </strong> {TvInfo.last_air_date}</p>
//                 </section>
//             )
//         } else {
//             latestEpisode = (
//                 <div>

//                     <section style={{ margin: '10px auto'}}>
//                         <h2 style={{ fontSize: '1.5rem'}}>Last Episode Aired</h2>
//                         <article style={{ margin: 'auto 1rem'}}>
//                             <p><strong>Episode Name: </strong>{TvInfo.last_episode_to_air.name}</p>
//                             <p><strong>Season: </strong>{TvInfo.last_episode_to_air.season_number}</p>
//                             <p><strong>Episode Number: </strong>{TvInfo.last_episode_to_air.episode_number}</p>
//                             <p><strong>Aired On: </strong>{TvInfo.last_episode_to_air.air_date}</p>
//                         </article>
//                     </section>
//                     <section style={{ margin: '10px auto'}}>
//                         <h2 style={{ fontSize: '1.5rem'}}>Next Episode To Air</h2>
//                         <article style={{ margin: 'auto 1rem'}}>
//                             <p><strong>Episode Name: </strong>{TvInfo.next_episode_to_air.name}</p>
//                             <p><strong>Season: </strong>{TvInfo.next_episode_to_air.season_number}</p>
//                             <p><strong>Episode Number: </strong>{TvInfo.next_episode_to_air.episode_number}</p>
//                             <p><strong>Aired On: </strong>{TvInfo.next_episode_to_air.air_date}</p>
//                         </article>
//                     </section>
//                 </div>
//             )
//         }
//     }
//     // console.log(AllDone)
//     return (
//         <div>
//             {
//                 TvInfo &&
//                 <div>
//                     <MainImage 
//                         image={`${IMAGE_URL}${TvInfo.backdrop_path}`} 
//                         poster={`${IMAGE_URL}${TvInfo.poster_path}`} />
//                 </div>      
//             }
//             {/* {console.log(MovieInfo? 'a': 'b')} */}
//             {
//                 TvInfo &&
//                 <div className='details'>
//                     <section>
//                         <h1 className='movie-title'>
//                             {
//                                 TvInfo.name || TvInfo.title ||
//                                 TvInfo.original_name ||
//                                 TvInfo.original_title
//                             }
//                             <WatchLater />
//                         </h1>
//                         {TvInfo.genres.map(genre => {
//                             return <span key={genre.id}>{genre.name}</span>;
//                         })}
//                     </section>
//                     <article>
//                         <h2 className='section-heading'>{isAnime.current? 'Anime': 'Show'} Overview</h2>
//                         {TvInfo.overview}
//                     </article>
//                     <article>
//                         <p><strong>Status: </strong> {TvInfo.status}</p>
//                         <p><strong>First Aired On: </strong> {TvInfo.first_air_date}</p>
//                         {TvInfo.tagline === ''? null: 
//                             <p><strong>Tagline: </strong> {TvInfo.tagline}</p>}
//                         <p>
//                             <strong>Episode Run Time(Avg): </strong>
//                             {TvInfo.episode_run_time.forEach(time => {
//                                 averageRunTime += time;
//                             })}
//                             {averageRunTime/TvInfo.episode_run_time.length + ' Minutes'}
//                         </p>
//                         <p><strong>Total Seasons: </strong>{TvInfo.number_of_seasons}</p>
//                         <p><strong>Total Episodes Count: </strong>{TvInfo.number_of_episodes}</p>
//                         {latestEpisode}
//                         {/* // TODO convert ISO language code to full form (en => english) */}
//                         {/* <p>{TvInfo.original_language}</p> */}
//                     </article>
//                     <section>
//                         <section style={{ position: 'relative' }}>
//                             <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
//                                 Seasons
//                             </span>
//                             <span onClick={selectAll}>
//                                 <WatchedButton
//                                     className='watchBtn'
//                                     details={TvInfo}
//                                     mediaType='tv'
//                                     watched={AllDone}
//                                     update={Update}
//                                     recentWatched={WatchedEpisodes} />
//                             </span>
//                         </section>
//                         {
//                             RefChanged && TvInfo.seasons.map((season, index) => {
//                                 const episodesDone = (
//                                     watchStatus.current[index].episodesDone.findIndex(value => value === false) >= 0?
//                                     watchStatus.current[index].episodesDone.findIndex(value => value === false):
//                                     season.episode_count
//                                     )
//                                 return (
//                                     <div className='season-info' key={season.id} onClick={e => displaySeasonInfo(season.season_number, e)}>
//                                         <input type='checkbox' name={season.name} checked={watchStatus.current[index].allDone} onChange={e => handleSelect(index, season.name, e)}/>
//                                         <span value={season.season_number}>{season.name}</span>
//                                         <progress 
//                                             value={episodesDone} 
//                                             max={season.episode_count}></progress>
//                                         <span>{episodesDone}/{season.episode_count}</span>
//                                         <section className='episode-info-container'>
//                                             {
//                                                 RefChanged && 
//                                                 EpisodeInfo.season_number === season.season_number &&
//                                                 <EpisodeDetails info={EpisodeInfo.info} isDone={watchStatus.current[index]} handleSelect={handleSelect} />
//                                             }
//                                         </section>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </section>
//                     <section>
//                         {
//                             SimilarShows && <CardContainer
//                             heading={{
//                                 text: `Similar ${isAnime.current? 'Anime': 'Tv Show'}`, 
//                                 size: '2rem',
//                                 margin: '0'
//                             }}
//                             movies={[...SimilarShows]}
//                             netflixScroll = {true}
//                             button={{
//                                 onClick: loadMore,
//                                 text: <i className="fas fa-angle-double-right"></i>
//                             }}
//                             />
//                         }
//                     </section>
//                 </div>
//             }
//         </div>
//     );
// }

// export default TvShowDetails;
