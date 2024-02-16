import React from 'react';
import './MainImage.css';

const MainImage = props => {
    console.log('render')

    // checks for the length of the title and changes the size if too big to fit in one line and look neat
    let style = null, size = 10, textLength;
    if(props.title){
        textLength = props.title.length;
        if(textLength >= 18){
            style = { fontSize: `${size-2}vw` }
        } else if(textLength >= 20){
            style = { fontSize: `${size-3}vw` }
        } else if(textLength >= 25){
            style = { fontSize: `${size-5.5}vw` }
        }
    }

    // if the main image is not available, poster will be the default option
    let posterClassName = props.image.includes('null') ? 'fallback-poster' : 'poster'

    return (
        <div className='poster-container'>
            <img src={props.poster} className={posterClassName} alt='Poster'/>
            <h1 className='poster-title' style={style}>
                {props.title}
            </h1>
        </div>
    );
}

export default MainImage;
