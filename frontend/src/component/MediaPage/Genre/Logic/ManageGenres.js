import { useEffect, useState } from 'react';
import { getFullUrl, useFetchData } from '../../../../common-functions/functions';

function ManageGenres(params){
    const { getSelectedGenres: sendGenres, url } = params;

    const [isError, isLoading, genres] = useFetchData(getFullUrl(url, 1));
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [Genres, setGenres] = useState([]);
    
    useEffect(() => {
        setGenres(genres.genres);

    }, [genres]);

    
    function addGenre(genre){
        const selected = [...selectedGenres, genre];
        setGenres(Genres.filter((g) => g.id !== genre.id));

        setSelectedGenres(selected);
        sendGenres(selected);
    }


    function removeGenre(genre){
        const allGenres = [...Genres, genre];
        const unselected =  selectedGenres.filter((g) => (g.id !== genre.id));

        allGenres.sort((genre1, genre2) => {
            return (genre1.name > genre2.name) ? 1 : -1;
        });

        setGenres(allGenres);
        setSelectedGenres(unselected);
        sendGenres(unselected);
    }

    return [
        selectedGenres, addGenre, removeGenre,
        isError, isLoading, Genres
    ]
}

export default ManageGenres;
