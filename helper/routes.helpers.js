const { TvSeries } = require("../models/watch.list.model");

function createNewTvSeriesObject(values){
    
    const newTvSeries = new TvSeries({
        name: values.name,
        poster: values.poster,
        series_id: values.series_id,
        completed_series: values.completed_series,
        status: values.status,
        watched_time: values.watched_time,
        watched_episodes: values.watched_episodes,
        total_episodes: values.total_episodes
    });

    newTvSeries.episode_status.forEach((season) => {
        newTvSeries.episode_status.push(new Seasons({
            name: season.name,
            episodes: season.episodes,
            total_episodes: season.total_episodes
        }))
    })

    return newTvSeries;
}

function updateTvSeriesObject(oldValues, newValues){
    oldValues.completed_series = newValues.completed_series;
    oldValues.status = newValues.status;
    oldValues.watched_time = newValues.watched_time;
    oldValues.watched_episodes = newValues.watched_episodes;
    oldValues.total_episodes = newValues.total_episodes;
    if(newValues.completed_series){
        oldValues.episode_status = [];
    } else {
        oldValues.episode_status = newValues.episode_status;
    }
    return oldValues;
}

module.exports = {
    createNewTvSeriesObject,
    updateTvSeriesObject
}