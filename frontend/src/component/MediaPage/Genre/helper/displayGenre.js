// it will map the genres and add click functionality
function displayGenres(genres, handleClick, className){
    console.log(genres )
    return (
        genres.map((genre) => (
            <div
            key={genre.id}
            className={`genre-box ${className} genre genre-${genre.id}`}>
                <span onClick={() => handleClick(genre)} >
                    {genre.name}
                </span>
                {className.includes('-') ? <i className="fas fa-times-circle"></i>: null}
            </div>
        ))
    );
}

export default displayGenres;