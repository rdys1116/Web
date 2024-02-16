const express = require('express');
const router = express.Router();

const { updateTvSeriesObject, createNewTvSeriesObject } = require('../helper/routes.helpers');
const { TrackList, TvSeries, Seasons, Movies, CollectionDetails } = require('../models/watch.list.model');

//** ANIME
// --------- GET
router.get('/:id', (req, res) => {
    // console.log(req);
    TrackList.findOne({ "anime_tracked.series_id" : req.params.id })
    .then((list) => {
        let anime;
        if(!list) return res.json({ isError: `No Data Found` });

        list.anime_tracked.every(series => {
            if(+series.series_id === +req.params.id){
                console.log('Anime found in List');
                anime = series;
                return false;
            }
            return true;
        })

        console.log('Anime not found in List');
        return res.json(anime);
    })
    .catch((err) => res.json({ isError: err }));
})


// --------- POST
router.route('/track').post((req, res) => {
    TrackList.findOne({ user: req.body.userId })
    .then(list => {
        // flag to check if the series is already been track to update the episodes status
        let trackedAnime = null;
        list.anime_tracked.every(anime => {
            if(+anime.series_id === +req.body.series_id){
                console.log(`${req.body.name} is being tracked`);
                trackedAnime = anime;
                return false;
            }
            return true;
        })
        
        if(trackedAnime){
            updateTvSeriesObject(trackedAnime, req.body);
            console.log(`${req.body.name} is updated`);
        } else {
            console.log(`${req.body.name} is now tracked`);
            const newAnime = createNewTvSeriesObject(req.body);

            list.anime_tracked.push(newAnime);
        }

        list.save().catch(err => console.log(err));
        
        return res.json(list);
    })
    .catch(err => res.json({ isError: err }));
})

// delete a series which is tracked
router.route('/untrack').post((req, res) => {
    TrackList.findOne({ user: req.body.userId })
    .then(list => {
        let filteredAnimeList = list.anime_tracked.filter(series => (series.series_id !== req.body.series_id));
        
        list.anime_tracked = filteredAnimeList;
        
        list.save().catch(err => console.log(err));
        console.log(`Anime with id ${req.body.series_id} is removed from the list`);
        
        return res.json(list);
    })
    .catch(err => console.log({ message: err }));
})


module.exports = router;