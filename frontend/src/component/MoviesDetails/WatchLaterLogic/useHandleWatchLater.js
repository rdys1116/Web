import { useEffect, useState } from 'react';
import { removeMedia, saveMedia } from '../../../common-functions/watchLater';

function useHandleWatchLater(movieInfo, type = '') {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedList = localStorage.getItem('savedMediaIds') ?
            localStorage.getItem('savedMediaIds').split(',') : [];

        // console.log(savedList.includes(movieInfo.id.toString()));
        setIsSaved(savedList.includes(movieInfo.id.toString()));
    }, []);

    function handleSaveBtn(){
        const state = !isSaved;

        if(state){
            saveMedia(movieInfo, type);
        } else {
            removeMedia(movieInfo.id);
        }

        setIsSaved(state);
    }

    return [handleSaveBtn, isSaved];
}


export default useHandleWatchLater;
