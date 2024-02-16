import React from 'react';

import useHandleSearch from './Logic/useHandleSearch';
import './AutoSuggestionSearch.css';

const AutoSuggestionSearchBar = (props) => {
    const { receiveQuery: sendQuery } = props;

    const [
        query, handleQuery, 
        suggestion, handleClick,
        handleOnFocus, handleOnBlur,
        highlightSuggestion, handleKeyDown
    ] = useHandleSearch(sendQuery);


    return (
        <div className='search-box'>
            <label>Search: </label>
            <input
            type='search'
            value={query}
            onChange={handleQuery}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            />
            <div className='suggestion-box'>
                {
                    suggestion.map((item, index) => {
                        return (
                            <p
                            onClick={ () => handleClick(item) }
                            className={
                                highlightSuggestion===index ? 
                                'selected-item' : ''
                            }
                            key={item.id}>
                                {item.name}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AutoSuggestionSearchBar;
