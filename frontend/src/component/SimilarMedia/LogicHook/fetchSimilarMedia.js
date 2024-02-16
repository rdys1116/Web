import { useState, useEffect } from "react";
import { getFullUrl, fetchData, isItAnime } from '../../../common-functions/functions';

let pageNumber = 1;
function useSimilarMedia(media, type){
    const [SimilarMedia, setSimilarMedia] = useState([]);
    const [IsAnime, setIsAnime] = useState(false);
    
    // set the useRef and isSeriesCompleted state to default form after tv details are fetched
    useEffect(() => {
        fetchData(
            getFullUrl(`${type}/${media.id}/similar`, pageNumber),
            setSimilarMedia,
            SimilarMedia
        )
        if(type === 'tv'){
            setIsAnime(isItAnime(media));
        }
    }, []);
    
    function loadMore() {
        pageNumber += 1;
        fetchData(getFullUrl(`${type}/${media.id}/similar`, pageNumber), setSimilarMedia, SimilarMedia);
    }
    return [SimilarMedia || [], IsAnime, loadMore];
}

export default useSimilarMedia;