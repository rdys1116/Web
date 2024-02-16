
// import React from 'react';

// import useManageWatchedEpisodes from './Logic/ManageSeasonInfo';
// import ToggleButton from '../../Display-Card/Watched';
// import EpisodeDetails from '../EpisodeInfo/EpisodeDetails';

//** this is component which enables user to select episodes at random with the help of array
//** i don't think this is helpful as we watch shows chronologically and the code was too much 
//** so i opted out for different solution where user can select episodes which will select all the previous 
//** episodes, this file is saved till i figure out alternative way to save it with the whole project, 
//** maybe git branch will help
// const SeasonsInfo = (props) => {
//     const TvInfo = props.shows;

//     const [
//         displaySeasonInfo, EpisodeInfo, IsSeriesCompleted,
//         IsSeriesTracked, watchStatus,
//         handleTracked, handleCompleted, handleSelect,
//     ] = useManageWatchedEpisodes(TvInfo);

//     return (
//         <div>
//             {
//                 TvInfo &&
//                 <div className='details'>
//                     <section>
//                         <section style={{ position: 'relative' }}>
//                             <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
//                                 Seasons
//                             </span>
//                             <>
//                                 <ToggleButton 
//                                     state={IsSeriesTracked}
//                                     key={IsSeriesTracked}
//                                     handleClick={handleTracked}
//                                     ontrue='Stop tracking'
//                                     onfalse='track'
//                                     className='watchBtn'
//                                 />
//                             </>
//                             <>
//                                 <ToggleButton 
//                                     state={IsSeriesCompleted}
//                                     key={IsSeriesCompleted}
//                                     handleClick={handleCompleted}
//                                     ontrue={<i className="fas fa-check-circle"></i>}
//                                     onfalse={<i className="far fa-check-circle"></i>}
//                                     className='watchBtn'
//                                 />
//                             </>
//                         </section>
//                         {
//                             IsSeriesCompleted !== undefined &&
//                             TvInfo.seasons.map((season, index) => {
//                                 const episodesDone = (
//                                     watchStatus.current[index].episodesDone.findIndex(value => value === false) >= 0?
//                                     watchStatus.current[index].episodesDone.findIndex(value => value === false):
//                                     season.episode_count
//                                     )
//                                 return (
//                                     <div className='season-info' key={season.id} onClick={e => displaySeasonInfo(season.season_number, e)}>
//                                         <input 
//                                             type='checkbox'
//                                             name={season.name} 
//                                             checked={watchStatus.current[index].allDone} 
//                                             onChange={ () => handleSelect(index) }/>
//                                         <span value={season.season_number}>{season.name}</span>
//                                         <progress 
//                                             value={episodesDone} 
//                                             max={season.episode_count}></progress>
//                                         <span>{episodesDone}/{season.episode_count}</span>
//                                         <section className='episode-info-container'>
//                                             {
//                                                 EpisodeInfo.season_number === season.season_number &&
//                                                 <EpisodeDetails 
//                                                     info={EpisodeInfo.info} 
//                                                     isDone={watchStatus.current[index]} 
//                                                     handleSelect={handleSelect} />
//                                             }
//                                         </section>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </section>
//                 </div>
//             }
//         </div>
//     );
// }

// export default SeasonsInfo;

//** logic part of the above component, originally in different file
//** saved here to have all the code in a single file
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// import { getUrl } from '../../../../common-functions/functions';
// import { 
//     updateRef, resetSelectedInput, removeTrackedSeries, trackSeries
// } from '../../helper';

// function useManageWatchedEpisodes(TvInfo){
//     const [Season, setSeason] = useState({});
//     const [EpisodeInfo, setEpisodeInfo] = useState({});
//     const [IsSeriesCompleted, setIsSeriesCompleted] = useState();
//     const [IsSeriesTracked, setIsSeriesTracked] = useState();
//     const [WatchedEpisodes, setWatchedEpisodes] = useState({
//         isCompleted: false,
//         name: '',
//         episodes: 0
//     });

//     let watchStatus = useRef([]);
//     const tvId = TvInfo.id;
//     let updateSeries = useRef(false);

//     // set the useRef and isSeriesCompleted state to default form after tv details are fetched
//     useEffect(() => {
//         if(TvInfo){
//             watchStatus.current = [];
//             for (let i = 0; i < TvInfo.seasons.length; i++) {
//                 watchStatus.current.push({
//                     name: TvInfo.seasons[i].name,
//                     allDone: false,
//                     episodesDone: Array(TvInfo.seasons[i].episode_count).fill(false)
//                 });
//             }
//             setIsSeriesCompleted(false);
//             setIsSeriesTracked(false);
//         }
//     }, [TvInfo]);

//     const displaySeasonInfo = (season_number, e) => {
//         if(e.target.type === 'checkbox') return;

//         if(EpisodeInfo.season_number === season_number){
//             return setEpisodeInfo({ season_number: null, info: null });
//         }
//         // TODO change the fetch to the function fetchData
//         if(season_number.toString()){
//             fetch(getUrl(1, `tv/${tvId}/season/${season_number}`))
//                 .then(res => res.json())
//                 .then(res => setSeason(res))
//                 .catch(err => console.log(err));
//         } else {
//             setSeason([])
//         }
//     }

//     // sets seasons details in state
//     useEffect(() => {
//         setEpisodeInfo({
//             season_number: Season.season_number,
//             info: Season
//         })
//     }, [Season])

//     const selectAll = () => {
//         const state = !WatchedEpisodes.isCompleted; 
//         updateRef([state, TvInfo.seasons.length, watchStatus.current, TvInfo]);
        
//         setIsSeriesCompleted(state);
//         setIsSeriesTracked(state);
//         setWatchedEpisodes({
//             isCompleted: state,
//             name: state? TvInfo.seasons[TvInfo.seasons.length - 1].name: '',
//             episodes: state? TvInfo.seasons[TvInfo.seasons.length - 1].episode_count: 0
//         });
//     }

//     useEffect(() => {
//         if(TvInfo && watchStatus.current){
//             const trackedSeries = localStorage.getItem('watchedMediaIds').split(',');

//             if(trackedSeries.includes(TvInfo.id.toString())){
//                 axios.get('/list/getTrackedSeries', { params: { seriesId: TvInfo.id }})
//                 .then(res => {
//                     console.log(res.data);
                    
//                     if(res.data.series_id){
//                         if(res.data.completed_series) return selectAll();
                        
//                         setWatchedEpisodes({
//                             isCompleted: false,
//                             name: res.data.last_watched_episode[0].name,
//                             episodes: res.data.last_watched_episode[0].episodes_watched
//                         });
//                         setIsSeriesTracked(true);
//                         handleSelect(
//                             res.data.last_watched_episode[0].episodes_watched,
//                             res.data.last_watched_episode[0].name,
//                             true
//                         );
//                     }
//                 })
//             }
//         }
//     }, [TvInfo]);
//     useEffect(() => {
//         console.log(tvId, WatchedEpisodes, IsSeriesTracked, updateSeries.current)
//         if(IsSeriesTracked && updateSeries.current){
//             console.log('should update')
//             trackSeries(tvId, WatchedEpisodes, watchStatus.current);
//             updateSeries.current = false;
//         }
//     }, [tvId, WatchedEpisodes, IsSeriesTracked, updateSeries])
    
//     function getIndexForSecondClick(index) {
//         if(watchStatus.current.length >= index && watchStatus.current[index].allDone){
//             if(watchStatus.current.length-1 === index || !watchStatus.current[index+1].allDone){
//                 return index;
//             }
//         }
//         return ++index;
//     }
//     function handleSeasonSelect(params) {
//         let [array, state, limit, index] = params;

//         console.log(watchStatus.current)
//         for(let i=0; i<limit; ++i){
//             array = watchStatus.current[i];
//             state = !watchStatus.current[index].allDone;
            
//             array.episodesDone = Array(array.episodesDone.length).fill(state);
//             array.allDone = state;
//         }
//     }
//     function handleEpisodeSelect(params){
//         let [limit, season] = params;
//         updateRef([true, season, watchStatus.current, TvInfo]);
//         if(TvInfo.seasons[0].name.includes('Season')){
//             season -= 1;
//         }
        
//         for(let i=0; i<limit; ++i){
//             watchStatus.current[season].episodesDone[i] = true;
//         }
//         console.log(season)
        
//         watchStatus.current[season].allDone = watchStatus.current[season].episodesDone.every(value => value === true);
//     }
//     const handleSelect = (index, name, isRenderFirstTime) => {
//         let array, state;
//         const limit = getIndexForSecondClick(index);
//         const isTrackedNow = WatchedEpisodes;
//         console.log(limit, index)
//         updateRef([false, TvInfo.seasons.length, watchStatus.current, TvInfo]);
        
//         name? handleEpisodeSelect([ 
//             limit, 
//             name.split(' ')[1]
//         ]): 
//             handleSeasonSelect([ array, state, limit, index ]);
            
//         if(IsSeriesTracked === false && isTrackedNow.isCompleted === false){
//             setIsSeriesTracked(true);
//             setWatchedEpisodes(isTrackedNow);
//             console.log('saved');
//         }
//         console.log('saved');
//         console.log(isTrackedNow);

//         const updateState = [
//             watchStatus.current,
//             TvInfo.seasons,
//             setIsSeriesCompleted, 
//             setIsSeriesTracked, 
//             setWatchedEpisodes
//         ]
//         resetSelectedInput(updateState);
//         if(!isRenderFirstTime){
//             updateSeries.current = true;
//         }
//     }
    
//     function handleTracked() {
//         const state = !IsSeriesTracked;
//         const watched = WatchedEpisodes;
//         updateRef([state, TvInfo.seasons.length, watchStatus.current, TvInfo]);
        
//         watched.isCompleted = state;
//         if(IsSeriesTracked){
//             watched.name = '';
//             watched.episodes = 0;
//             console.log('removed')
//             removeTrackedSeries(tvId);
//         } else {
//             console.log('r')
//             updateSeries.current = true;
//             // trackSeries(tvId, WatchedEpisodes, watchStatus.current);
//         }
//         console.log(IsSeriesTracked, state)

//         console.log(watched)
//         setIsSeriesTracked(state);
//         setIsSeriesCompleted(state);
//         setWatchedEpisodes(watched);
//     }
    
//     function handleCompleted() {
//         updateRef([!IsSeriesCompleted, TvInfo.seasons.length, watchStatus.current, TvInfo]);
        
//         let allWatched = WatchedEpisodes;
//         allWatched.isCompleted = !IsSeriesCompleted;
        
//         if(!WatchedEpisodes.completed){
//             allWatched.name =  TvInfo.seasons[TvInfo.seasons.length - 1].name;
//             allWatched.episodes = TvInfo.seasons[TvInfo.seasons.length - 1].episode_count;
//         } else{
//             allWatched.name = '';
//             allWatched.episodes = 0;
//         }
//         setWatchedEpisodes(allWatched);
//         setIsSeriesTracked(true);
//         setIsSeriesCompleted(!IsSeriesCompleted)
//         updateSeries.current = true;
//     }
//     return [
//         displaySeasonInfo, EpisodeInfo, IsSeriesCompleted,
//         IsSeriesTracked, watchStatus,
//         handleTracked, handleCompleted, handleSelect,
//     ];
// }
