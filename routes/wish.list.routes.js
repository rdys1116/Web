const express = require('express');
const { WishList, Media } = require('../models/wish.list.model');
const router = express.Router();

// GET List
router.get('/getWishList/:userId', (req, res) => {
    WishList.findOne({ user: req.params.userId })
    .then((list) => {
        if(!list) return res.json({ isError: 'No Data Found!!' });

        console.log('/getWishList: Wish List send');
        return res.json(list);
    })
    .catch(err => res.json({ isError: err }));
});


//** MOVIES api end points for querying
// --------- POST
router.route('/save').post((req, res) => {
    WishList.findOne({ user: req.body.userId })
    .then((list) => {

        let isAlreadyPresent = false;
        list.wish_list.every((media) => {
            if(+media.media_id === +req.body.mediaId){
                console.log(`${req.body.name} is Already Being Tracked`);
                isAlreadyPresent = true;
                return false;
            }
            return true;
        })

        if(isAlreadyPresent) return res.json('Already tracked');
        
        const newMedia = new Media({
            name: req.body.name,
            poster: req.body.poster,
            media_id: req.body.media_id,
            media_type: req.body.media_type
        });
        
        list.wish_list.push(newMedia);

        list.save().catch(err => console.log(err));
        console.log(`${req.body.name} is now tracked`);

        return res.json(list);
    })
    .catch(err => res.json({ isError: err }));
});


// delete a tracked movie when requested
router.route('/remove').post((req, res) => {
    WishList.findOne({ user: req.body.userId })
    .then((list) => {
        let newWishList = list.wish_list.filter(media => (media.media_id !== req.body.media_id));
        list.wish_list = newWishList;

        list.save().catch(err => console.log(err));
        
        console.log(`Movie with is the id ${req.body.media_id} is removed from the List`);
        return res.json(list);
    })
    .catch(err => res.json({ isError: err }));
})


module.exports = router;