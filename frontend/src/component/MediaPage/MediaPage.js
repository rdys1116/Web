import React from 'react';

import CardContainer from '../../component/Display-Card/CardContainer';
import DropDown from '../../component/MediaPage/DropDown/DropDown';
import Genre from '../../component/MediaPage/Genre/Genre';
import NoData from '../NoData/NoData';
import Loading from '../Preloader/Loading';


const MediaPage = (props) => {
    const {
        genres, dropDown, heading, 
        mediaData, isDataEmpty, metaData,
        loadMoreBtn
    } = props;

    return (
        <>
            <section>
                <Genre getSelectedGenres={genres.setGenres} url={genres.url}/>
                <DropDown 
                title='Sort By: ' 
                options={dropDown.options} 
                handleChange={dropDown.handleDropDown}/>
            </section>
            {
                isDataEmpty ? 
                <NoData /> :

                mediaData.length < 1 ?
                    <Loading /> :
                    (
                        <CardContainer
                        heading={{
                            text: heading,
                            size: '1.8rem',
                            margin: '10px 20px'
                        }}
                        movies={mediaData}
                        button={
                            metaData && metaData.total_results !== mediaData.length &&
                            {
                                onClick: loadMoreBtn.onClick,
                                ref: loadMoreBtn.infiniteScroll,
                                text: 'Load More'
                            }
                        } />
                    )
            }
        </>
    )
}

export default MediaPage;
