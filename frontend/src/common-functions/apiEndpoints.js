// api endpoints for my server for updating database 
const API = {
    user: {
        login: '/user/login',
        register: '/user/register',
        delete: '/user/delete'
    },
    wishList: {
        get: '/wishList/getWishList',
        save: '/wishList/save',
        remove: '/wishList/remove'
    },
    trackList: {
        list: '/trackList/getList',

        getMovie: '/movie',
        trackMovie: '/movie/track',
        untrackMovie: '/movie/untrack',
        
        getTvShow: '/tvShow',
        trackTvShow: '/tvShow/track',
        untrackTvShow: '/tvShow/untrack',
        
        getAnime: '/anime',
        trackAnime: '/anime/track',
        untrackAnime: '/anime/untrack',
    }
}

export default API;
