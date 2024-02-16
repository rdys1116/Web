import { useState, useEffect } from 'react';
import { fetchData, getUrl } from '../../frontend/src/common-functions/functions';

function useFetchTvCards(tvId){    
    const [TvInfo, setTvInfo] = useState();

    // saves tv series data in state
    useEffect(() => {
        fetchData(
            getUrl(1, `tv/${tvId}`),
            setTvInfo,
            TvInfo
        );
    }, []);

    return TvInfo;
}

export default useFetchTvCards;