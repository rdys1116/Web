const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    media_id: { type: Number, required: true },
    media_type: { type: String, required: true }
});

const WishListSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    wish_list: [{ type: MediaSchema, default: [] }],
}, {
    collection: 'Wish_List',
    timestamps: true
})

const WishList = mongoose.model('WishList', WishListSchema);
const Media = mongoose.model('Media', MediaSchema);

module.exports = {
    WishList,
    Media
};