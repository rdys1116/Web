const express = require('express');
const router = express.Router();

const { updateTvSeriesObject, createNewTvSeriesObject } = require('../helper/routes.helpers');
const { TrackList, TvSeries, Seasons, Movies, CollectionDetails } = require('../models/watch.list.model');



//** TV SHOWS api end points for querying
// --------- GET
router.get('/:id', (req, res) => {
    console.log(req.params)
    TrackList.findOne({ "tv_series_tracked.series_id" : req.params.id })
    .then((list) => {
        let tvSeries;
        if(!list) return res.json({ isError: `No Data Found` });

        list.tv_series_tracked.every((series) => {
            if(+series.series_id === +req.params.id){
                console.log('Tv series found in List');
                tvSeries = series;
                return false; 
            }
            return true; 
        })

        return res.json(tvSeries);
    })
    .catch((err) => res.json({ isError: err }));
});


// --------- POST
router.route('/track').post((req, res) => {
    TrackList.findOne({ user: req.body.userId })
    .then((list) => {
        let trackedSeries = false;
        list.tv_series_tracked.every((series) => {
            if(+series.series_id === +req.body.series_id){
                trackedSeries = series;
                return false;
            }
            return true;
        })
        console.log(trackedSeries);
        
        if(trackedSeries){
            updateTvSeriesObject(trackedSeries, req.body);
            console.log(`${req.body.name} is updated`);
        } else {
            console.log(trackedSeries);
            const newTvSeries = createNewTvSeriesObject(req.body);
            console.log(newTvSeries);
            
            console.log(`${req.body.name} is now tracked`);
            list.tv_series_tracked.push(newTvSeries);
        }

        list.save().catch(err => console.log(err));
        return res.json(list);
    })
    .catch((err) => res.json({ isError: err }));
})

// delete a series which is tracked
router.route('/untrack').post((req, res) => {
    console.log(req.body);
    TrackList.findOne({ user: req.body.userId })
    .then((list) => {
        let filteredTvSeries = list.tv_series_tracked.filter(series => (series.series_id !== req.body.series_id));
        list.tv_series_tracked = filteredTvSeries;

        list.save().catch(err => console.log(err));
        console.log(`Tv Series with id ${req.body.series_id} is removed from the list`);
        
        return res.json(list);
    })
    .catch(err => res.json({ isError: err }));
})

module.exports = router;