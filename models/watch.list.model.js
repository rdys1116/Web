const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// used embedding of documents as i would use all the data in the profile page to display the tracked
const SeasonSchema = new Schema({
    name: { type: String },
    episodes: [{ type: Boolean, required: true }],
    total_episodes: { type: Number, required: true }
})

const TvSchema = new Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    series_id: { type: Number, required: true },
    completed_series: { type: Boolean, required: true },
    status: { type: String, required: true },
    watched_time: { type: Number, required: true },
    total_episodes: { type: Number, required: true },
    watched_episodes: { type: Number, required: true },
    episode_status: [{ type: SeasonSchema, default: [] }]
})

const CollectionSchema = new Schema({
    id: { type: Number },
    name: { type: String },
})

const MovieSchema = new Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    movie_id: { type: Number, required: true },
    watched_time: { type: Number, required: true },
    collection_details: [{ type: CollectionSchema, default: [] }]
})

const TrackListSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    movies_tracked: [{ type: MovieSchema, default: [] }],
    tv_series_tracked: [{ type: TvSchema, default: [] }],
    anime_tracked: [{ type: TvSchema, default: [] }]
}, {
    collection: 'Track_List',
    timestamps: true
})

const TrackList = mongoose.model('TrackList', TrackListSchema);
const TvSeries = mongoose.model('TvSeries', TvSchema);
const Seasons = mongoose.model('Seasons', SeasonSchema);
const Movies = mongoose.model('Movies', MovieSchema);
const CollectionDetails = mongoose.model('CollectionDetails', CollectionSchema);

module.exports = {
    TrackList,
    TvSeries,
    Seasons,
    Movies,
    CollectionDetails
};