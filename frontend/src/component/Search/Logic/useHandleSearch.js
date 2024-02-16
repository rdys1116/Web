import  { useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL, TMDB_API_KEY } from './../../../config';

function useHandleSearch(sendQuery){
    const [query, setQuery] = useState('Enter Query...');
    const [suggestion, setSuggestion] = useState([]);
    const [highlightSuggestion, setHighlightSuggestion] = useState(-1);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if(query !== '' && query !== 'Enter Query...'){
                sendQuery(query);
                setSuggestion([]);
            }
        }, 1500);

        return () => clearTimeout(timeout)
    }, [query])

    function handleOnFocus(){
        setQuery('');
    }

    function handleQuery(e){
        const value =  e.target.value;

        setQuery(value);
        // https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&query=a&page=1
        if(e.target.value.length > 0){
            axios.get(`${BASE_URL}/search/keyword?api_key=${TMDB_API_KEY}&query=${value}`)
            .then((res) => {
                setSuggestion(res.data.results);
                setHighlightSuggestion(-1);
            })
            .catch((err) => {
                setSuggestion([]);
                console.log(err)
            });
        };
    }

    function handleOnBlur(){
        setQuery('Enter Query...');
        setSuggestion([]);
    }

    function handleClick(suggestion){
        setQuery(suggestion.name);
    }

    function handleKeyDown(e){
        let index = highlightSuggestion;

        if(e.keyCode === 40){
            index = (index > (suggestion.length - 2)) ? 0 : (index + 1);

        } else if(e.keyCode === 38){
            index = (index < 0) ? (suggestion.length - 1) : (index - 1);
        
        }
        
        if(
            (e.keyCode === 13) &&
            (index < suggestion.length) &&
            (index >= 0)
         ){
            setQuery(suggestion[index].name);
            setSuggestion([]);
        }
        setHighlightSuggestion(index);
    }


    return [
        query, handleQuery, 
        suggestion, handleClick,
        handleOnFocus, handleOnBlur,
        highlightSuggestion, handleKeyDown
    ]
}

export default useHandleSearch;
