import { useEffect, useRef, useState } from 'react';

import { fetchData, getFullUrl } from '../../../../common-functions/functions';
import { 
    trackAndUpdateSeries, removeTrackedSeries, getTrackedEpisodeDetails,
    isAnyEpisodeWatched, generateSeasonDetails
} from '../../helper';


function useManageWatchedSeasons(TvInfo, isAnime){
    const [isTracked, setIsTracked] = useState();
    const [isCompleted, setIsCompleted] = useState();
    const [episodeData, setEpisodeData] = useState({});
    const [refreshPage, setRefreshPage] = useState('no refresh needed');

    const watchStatus = useRef({});

    useEffect(() => {

        getTrackedEpisodeDetails(TvInfo, isAnime)
        .then((response) => {
            if(response.data === 'Not Tracked'){
                markAllEpisodes(false);

            } else if(response.completed_series){
                markAllEpisodes(true);

            } else {
                response.episode_status.forEach((season) => {
                    generateSeasonDetails(watchStatus.current, season);
                });
            }
            
            console.log(watchStatus);
            setRefreshPage('first render')
        })
        .catch((err) => {
            // for cases when id is saved in local storage but not available in db
            if(err.isError){
                markAllEpisodes(false);
                
                console.log(watchStatus);
                setRefreshPage('first render')
            }
            
            console.log(err)
        });
    }, []);

    useEffect(() => {
        if(refreshPage !== 'no refresh needed'){
            // tracking is on if at least 1 episode is marked true
            let isTrackingOn = isAnyEpisodeWatched(watchStatus.current);
            
            let isComplete = false;
            for(let season in watchStatus.current){
                isComplete = watchStatus.current[season].episodes.every(value => value);
                if(!isComplete) break;
            }
            
            // if statement to prevent database updates in first render
            if(typeof refreshPage === "number"){
                if(isTrackingOn){
                    trackAndUpdateSeries(TvInfo, watchStatus.current, isAnime);
                    console.log('update db')
                } else {
                    removeTrackedSeries(TvInfo.id, isAnime);
                    console.log('remove')
                }
            }
            
            setIsTracked(isTrackingOn);
            setIsCompleted(isComplete);
        }
    }, [watchStatus, refreshPage]);



    function handleTrackedBtn(){
        const state = !isTracked;

        // should not track when no episode marked, it causes unusual behaviour
        if(!isAnyEpisodeWatched(watchStatus.current) && state) return;

        if(!state){
            markAllEpisodes(false);
        }
        setIsTracked(state);
        setRefreshPage(Math.random());
    }

    function handleCompletedBtn(){
        const state = !isCompleted;

        markAllEpisodes(state);
        setIsCompleted(state);
        setRefreshPage(Math.random());
    }

    function seasonStatus(seasonName, untrack){
        const state = untrack !== undefined ? untrack : !watchStatus.current[seasonName].isDone;

        for(let season in watchStatus.current){
            if(state){
                watchStatus.current[season] = {
                    isDone: state,
                    episodes: Array(watchStatus.current[season].episodes.length).fill(state)
                }
            }
            if(season === seasonName) break;
        }

        watchStatus.current[seasonName] = {
            isDone: state,
            episodes: Array(watchStatus.current[seasonName].episodes.length).fill(state)
        }
        
        setRefreshPage(Math.random());
    }

    function episodeStatus(episodeNumber, seasonData){
        const state = !watchStatus.current[seasonData.name].episodes[episodeNumber];

        if(state){
            for(let season in watchStatus.current){
                if(season === seasonData.name) {
                    watchStatus.current[season].isDone = false;
                    for(let i=0; i<=episodeNumber; ++i){
                        watchStatus.current[season].episodes[i] = true;
                    }
                    break
                }

                watchStatus.current[season] = {
                    isDone: state,
                    episodes: Array(watchStatus.current[season].episodes.length).fill(state)
                }
            }
        }

        watchStatus.current[seasonData.name].episodes[episodeNumber] = state;
    
        const isSeasonComplete = watchStatus.current[seasonData.name].episodes.every((value) => value);
        watchStatus.current[seasonData.name].isDone = isSeasonComplete;

        setRefreshPage(Math.random());
    }
    
    function displayEpisodesDetails(seasonNumber, e) {
        if(e.target.type === 'checkbox') return;

        // plus sign is shorthand for conversion into int data type
        if(+episodeData.season_number === +seasonNumber){
            return setEpisodeData({});
        }
        fetchData(
            getFullUrl(`tv/${TvInfo.id}/season/${seasonNumber}`, 1),
            setEpisodeData,
            episodeData
        )
    }

    // updates watch status of episodes or create if not present
    function markAllEpisodes(state){
        if(Object.keys(watchStatus.current).length > 0){
            for(let season in watchStatus.current){
                watchStatus.current[season] = {
                    isDone: state,
                    episodes: Array(watchStatus.current[season].episodes.length).fill(state)
                }
            }
        } else {
            TvInfo.seasons.forEach(season => {
                watchStatus.current[season.name] = {
                    isDone: state,
                    episodes: Array(season.episode_count).fill(state)
                };
            })
        }
    }

    return [
        isTracked, isCompleted,
        handleTrackedBtn, handleCompletedBtn,
        seasonStatus, episodeStatus, watchStatus.current,
        displayEpisodesDetails, episodeData
    ]
}

export default useManageWatchedSeasons;