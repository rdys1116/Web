const express = require('express');
const router = express.Router();

const { updateTvSeriesObject, createNewTvSeriesObject } = require('../helper/routes.helpers');
const { TrackList, TvSeries, Seasons, Movies, CollectionDetails } = require('../models/watch.list.model');

// GET List
router.get('/getList/:userId', (req, res) => {
    TrackList.findOne({ user: req.params.userId })
    .then(details => {
        if(!details) return res.json({ isError: 'No Data Found!!' });
        
        console.log('/getList: Tracked Collection send');
        return res.json(details);
    })
    .catch(err => res.json({ isError: err }));
});

module.exports = router;