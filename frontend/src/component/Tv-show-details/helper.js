import axios from 'axios';

import API from '../../common-functions/apiEndpoints';

function getTotalEpisodes(seasons){
    let total = 0;
    seasons.forEach((season) => (total += season.episode_count));
    
    console.log('final', total)
    return total;
}

function getTotalWatchedEpisodes(seasons){
    let total = 0;
    for(let season in seasons){
        if(seasons[season].isDone){
            total += seasons[season].episodes.length;

        } else {
            for(let episode in seasons[season].episodes){
                total += seasons[season].episodes[episode] ? 1 : 0;
            }
        }
    }

    console.log(total)
    return total;
}

function getAverageRunTime(array){
    let totalTime = 0;
    array.forEach((time) => (totalTime += time));

    return totalTime/array.length;
}

function removeTrackedSeries(seriesId, isAnime){
    const userId = localStorage.getItem('userId');
    if(!userId) return;

    const listItems = { 
        userId: userId,
        series_id: seriesId
    };
    let watchedList = localStorage.getItem('watchedMediaIds') ?
    localStorage.getItem('watchedMediaIds').split(',') : [];
    
    const url = isAnime ? API.trackList.untrackAnime : API.trackList.untrackTvShow;
    axios.post(url, listItems)
    .then(res => {
        console.log(res.data);
        watchedList = watchedList.filter((id) => (id.toString() !== seriesId.toString()));
        
        localStorage.setItem('watchedMediaIds', [...watchedList]);
        console.log(watchedList);
    
    })
    .catch(err => console.log(err));
}

function trackAndUpdateSeries(series, watchStatus, isAnime){
    const userId = localStorage.getItem('userId');
    if(!userId) return;

    const totalEpisodes = getTotalEpisodes(series.seasons);
    const watchedEpisodes = getTotalWatchedEpisodes(watchStatus);

    const listItems = {
        userId: userId,
        name: series.name || series.title || series.original_name || series.original_title,
        poster: series.poster_path,
        series_id: series.id,
        completed_series: totalEpisodes === watchedEpisodes,
        status: series.status,
        total_episodes: totalEpisodes,
        watched_episodes: watchedEpisodes,
        watched_time: watchedEpisodes *  getAverageRunTime(series.episode_run_time),
        episode_status: []
    };

    for(let season in watchStatus){
        // a single boolean value will be saved if all the episode in that season have same value
        // storage can be saved by doing this I believe!
        let episodeWatched = watchStatus[season].isDone ? 
            [true] : watchStatus[season].episodes;
        
        if(watchStatus[season].episodes.every(value => !value)) episodeWatched = [false];

        listItems.episode_status.push({
            name: season,
            episodes: episodeWatched,
            total_episodes: watchStatus[season].episodes.length
        })
    }

    let watchedList = localStorage.getItem('watchedMediaIds') ?
        localStorage
            .getItem('watchedMediaIds').split(',')
            .filter((ids) => (ids !== '')) : 
        [];

    if(!watchedList.includes(series.id.toString())){
        watchedList.push(series.id);
        localStorage.setItem('watchedMediaIds', [...watchedList]);
    }
    console.log(watchedList);

    const url = isAnime ? API.trackList.trackAnime: API.trackList.trackTvShow;
    console.log(url);

    axios.post(url, listItems)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function getTrackedEpisodeDetails(TvInfo, isAnime){
    return (
        new Promise((resolve, reject) => {
            const trackedSeries = localStorage.getItem('watchedMediaIds') ? 
                localStorage.getItem('watchedMediaIds').split(',') : [];

            if(trackedSeries.includes(TvInfo.id.toString())){
                const url = isAnime ? 
                    `${API.trackList.getAnime}/${TvInfo.id}` : 
                    `${API.trackList.getTvShow}/${TvInfo.id}`;
                
                axios.get(url)
                .then((res) => {
                    console.log(res.data)
                    return (res.data.isError) ? reject(res.data) : resolve(res.data);
                
                })
                .catch(err => console.log(err));
            
            } else {
                resolve({ data: 'Not Tracked'});
            }
        })
    )
}


function isAnyEpisodeWatched(seasonsObject){
    let isWatched = false;
    for(let season in seasonsObject){
        isWatched = seasonsObject[season].episodes.findIndex(value => value) >= 0;
        if(isWatched) return true;
    }
    return false;
}


// I saved single boolean value if all episodes in a season have same value,
// this function generates all the need value if single value is saved or assigns what is saved in db
function generateSeasonDetails(watchStatusObject, season){
    watchStatusObject[season.name] = {};
    if(season.episodes.length === 1){
        watchStatusObject[season.name].isDone = season.episodes[0];
        watchStatusObject[season.name].episodes = Array(season.total_episodes).fill(season.episodes[0]);

    } else {
        watchStatusObject[season.name].isDone = false;
        watchStatusObject[season.name].episodes = season.episodes

    }
}


export {
    getAverageRunTime,
    removeTrackedSeries,
    trackAndUpdateSeries,
    isAnyEpisodeWatched,
    generateSeasonDetails,
    getTrackedEpisodeDetails
};