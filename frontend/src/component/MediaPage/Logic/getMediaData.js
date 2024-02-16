import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchData, getFullUrl } from '../../../common-functions/functions';

function useFetchAndManageMediaData(urlDetails){
    const { defaultSort, urlPath } = urlDetails;

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState('');
    const [sortOption, setSortOption] = useState(defaultSort);
    const [mediaData, setMediaData] = useState([]);
    const [metaData, setMetaData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isDataEmpty, setIsDataEmpty] = useState(false);

    useEffect(() => {
        // update the genres at the top and filters the movies according to selected genres
        const genreIds = [];

        genres.forEach(genre => (genreIds.push(genre.id)));

        setSelectedGenres(genreIds.join(','));
        setMediaData([]);
        setPageNumber(1);
    }, [genres]);

    const options = useMemo(() => {
    
        return ({ sortOption: sortOption, genres: selectedGenres })
    }, [sortOption, selectedGenres]);

    useEffect(() => {
        async function getRequestedData(){
            const dataReceived = await fetchData(getFullUrl(urlPath, pageNumber, options), setMediaData, mediaData);
            console.log(dataReceived);
            setMetaData(dataReceived);
            setIsDataEmpty(dataReceived && dataReceived.results.length === 0);
        }

        getRequestedData();

    }, [pageNumber, options]);


    function handleDropDown(e){
        let option = e.target.value.replace(' ', '_').toLowerCase();

        setSortOption(option + '.desc');
        setMediaData([]);
        setPageNumber(1);
    }
    
    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback((node) => {
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) setPageNumber((pageNumber) => ++pageNumber);

        })
        
        if(node) observer.current.observe(node);
    }, []);

    // click functionality which fetch more movies
    function loadNextPage(){
        
        setPageNumber((pageNumber) => (pageNumber += 1));
    }

    return [
        mediaData, isDataEmpty, metaData,
        setGenres, handleDropDown, 
        loadNextPage, callBackForLoadingMore
    ]
}

export default useFetchAndManageMediaData;
