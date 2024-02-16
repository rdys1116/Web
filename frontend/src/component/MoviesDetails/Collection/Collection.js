import React from 'react';
import CardContainer from '../../Display-Card/CardContainer';
import Loading from '../../Preloader/Loading';
import useGetCollectionDetails from './Logic/useGetCollectionDetails';

const Collection = (props) => {
    const collectionInfo = props.collection;
    const [
        isError, isLoading, collection
    ] = useGetCollectionDetails(collectionInfo);

    if(isError) return null;

    return (
        <>
            {
                isLoading ?
                <Loading /> :
                (
                    <section>
                        <h1>{collection.name}</h1>
                        <p>{`Total Parts: ${collection.parts.length}`}</p>
                        <p>{ collection.overview }</p>
                        <CardContainer             
                        movies={[ ...collection.parts ]}
                        enableNetflixScroll
                        />
                    </section>
                )
            }
        </>
    )
}

export default Collection;
