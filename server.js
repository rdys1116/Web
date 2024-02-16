const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// environment variables
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
app.set('port', port);


// database connection
const uri = process.env.URI;
mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connection successful');
});


// ----- ROUTES
const user = require('./routes/auth.routes');
app.use('/user', user);

const trackList = require('./routes/list.routes');
app.use('/trackList', trackList);

const movieList = require('./routes/movie.list.routes');
app.use('/movie', movieList);

const tvShowList = require('./routes/tvShow.list.routes');
app.use('/tvShow', tvShowList);

const animeList = require('./routes/anime.list.routes');
app.use('/anime', animeList);

const wishList = require('./routes/wish.list.routes');
app.use('/wishList', wishList);



const publicPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(publicPath));

app.get('/user', (req, res) => res.json({name: 'req'}));

app.get('*',(req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(port, function () {
    console.log(`Server up and running on port ${port}`);
});