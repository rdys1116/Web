const express = require('express');
const router = express.Router();

const { updateTvSeriesObject, createNewTvSeriesObject } = require('../helper/routes.helpers');
const { TrackList, TvSeries, Seasons, Movies, CollectionDetails } = require('../models/watch.list.model');


//** MOVIES api end points for querying
// send all movies
router.get('/:id', (req, res) => {
    console.log(req.params);
    TrackList.findOne({ "movies_tracked.movie_id" : req.params.id })
    .then((list) => {
        let trackedMovie;
        console.log(list);
        if(!list) return res.json({ isError: 'No Data Found' });

        list.movies_tracked.every((movies) => {
            if(+movies.movie_id === +req.params.id){
                console.log(`${req.params.id} found in the List`);
                trackedMovie = movies;
                return false; 
            }
            return true; 
        })
        
        if(!trackedMovie){
            console.log(`${req.params.id} not found!`);
            return res.json({ isError: `${req.params.id} not found!`});
        }
        return res.json(trackedMovie);
    })
    .catch((err) => res.json({ isError: err }));
})


// --------- POST
router.route('/track').post((req, res) => {
    TrackList.findOne({ user: req.body.userId })
    .then((list) => {

        let isAlreadyTracked = false;
        list.movies_tracked.every((movie) => {
            if(+movie.movie_id === +req.body.movie_id){
                console.log(`${req.body.name} is Already Being Tracked`);
                isAlreadyTracked = true;
                return false;
            }
            return true;
        })

        if(isAlreadyTracked) return res.json('Already tracked');
        
        const newMovie = new Movies({
            name: req.body.name,
            poster: req.body.poster,
            movie_id: req.body.movie_id,
            watched_time: req.body.watched_time
        })

        if(req.body.collection){
            newMovie.collection_details = [
                new CollectionDetails({
                    id: req.body.collection.id,
                    name: req.body.collection.name,
                })
            ];
        } else{
            newMovie.collection_details = [null];
        }
        
        list.movies_tracked.push(newMovie)

        list.save().catch(err => console.log(err));
        console.log(`${req.body.name} is now tracked`);

        return res.json(list);
    })
    .catch((err) => res.json({ isError: err }));
});

// delete a tracked movie when requested
router.route('/untrack').post((req, res) => {
    TrackList.findOne({ user: req.body.userId })
    .then((list) => {
        let filteredMoviesList = list.movies_tracked.filter((movie) => (movie.movie_id !== req.body.movie_id));
        list.movies_tracked = filteredMoviesList;

        list.save().catch(err => console.log(err));
        
        console.log(`Movie with is the id ${req.body.movie_id} is removed from the List`);
        return res.json(list);
    })
    .catch((err) => res.json({ isError: err }));
});


module.exports = router;