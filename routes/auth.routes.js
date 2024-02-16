const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const { WishList } = require('../models/wish.list.model');
const { TrackList } = require('../models/watch.list.model');


// GET
// get login details
router.get('/login/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
        if(!user) return res.json("Not Registered");

        return res.status(200).json(user)
    })
    .catch(err => console.log(err));
})

// POST
// post new login
router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
    .then((user) => {
        if(!user) return res.status(401).json({ message: 'Not Registered!' }); 
        
        bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
            if(!isMatch) return res.json({ message: 'Incorrect Password!' });

            return res.status(200).json({
                userDetails: user,
                message: 'Login Success'
            })
        })
        .catch(err => res.json(err));
    }).catch(err => res.json(err));
});

// register
router.route('/register').post((req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email })
    .exec((err, user) => {
        if(err) throw err;
        if(user) return res.status(401).json({ message: 'Already Registered!' });

        const newUser = new User({
            name: name, 
            email: email,
            password: password
        });

        bcrypt.genSalt(10, (error, salt) => {
            if(error) throw error;

            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                const newTrackList = new TrackList({
                    user: newUser._id,
                })
                const newWishList = new WishList({
                    user: newUser._id
                });

                newUser.save();
                newTrackList.save();
                newWishList.save();

                return res.status(200).json({ 
                    userDetails: newUser,
                    message: 'Registered and Logged In.'
                })
            });
        });
    });
});

router.route('/delete/:id').post((req, res) => {
    
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id , async function(err, user){
        console.log(user)
        if(err) return res.json({ isError: err });
        if(!user) return res.status(401).json({ message: 'Not Registered!' });

        const trackList = await TrackList.remove({ user: req.params.id });
        const wishList = await WishList.remove({ user: req.params.id });
        
        if(trackList && wishList){
            return res.status(200).json({ message: `${user.name}'s account has been deleted` });
        }

        return res.json({ isError: 'Some Error Occurred, contact Vajresh' });
    }).catch(err => res.json(err));
});

// UPDATES
// TODO user can update email, password, username and can also retrieve password if forgotten.

module.exports = router;