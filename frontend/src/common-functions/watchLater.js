import axios from "axios";
import API from "./apiEndpoints";

function saveMedia(media, type){
    let savedList = localStorage.getItem('savedMediaIds') ?
    localStorage.getItem('savedMediaIds').split(',') : [];

    const data = {
        userId :  localStorage.getItem('userId'),
        name: media.name || media.title || media.original_name || media.original_title,
        poster: media.poster_path,
        media_id: media.id,
        media_type: type,
    }

    console.log(data)
    
    axios.post(API.wishList.save, data)
    .then((res) => {
        console.log(res)
        if(!savedList.includes(media.id.toString())){
            savedList.push(media.id);
            localStorage.setItem('savedMediaIds', [...savedList]);
        }
    })
    .catch(err => console.log(err));
}


function removeMedia(id){
    const listItems = { 
        userId: localStorage.getItem('userId'),
        media_id: id
    };

    let savedList = localStorage.getItem('savedMediaIds') ?
    localStorage.getItem('savedMediaIds').split(',') : [];
    
    axios.post(API.wishList.remove, listItems)
    .then((res) => {
        console.log(res.data);
        let isFiltered;
        savedList = savedList.filter((mediaId) => {
            isFiltered = (mediaId === id.toString());
            return !isFiltered;
        });
        
        if(isFiltered) localStorage.setItem('savedMediaIds', [...savedList]);
    })
    .catch(err => console.log(err));
}

export {
    saveMedia,
    removeMedia
}