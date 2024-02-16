import React from 'react';
import Button from '../MediaDetails/Buttons';
import useHandleMovieTrack from './TrackingLogic/useHandleTracking';
import useHandleWatchLater from './WatchLaterLogic/useHandleWatchLater';

const ActionButtons = (props) => {
    const movie = props.movie;

    const [handleTrackedBtn, isTracked] = useHandleMovieTrack(movie);

    const [handleSaveBtn, isSaved] = useHandleWatchLater(movie, 'movie');
    
    return (
        <div style={{
            margin: '15px auto 0'
        }}>
            {
                isTracked !== undefined &&
                <Button
                onClick={handleTrackedBtn}
                displayText={isTracked ? 'Stop Track' : 'Track'}
                />
            }
            <Button
            onClick={handleSaveBtn}
            customize='button-icon'
            displayText={isSaved ? <i className="fas fa-bookmark" /> :  <i className="far fa-bookmark" />}
            />
        </div>
    );
}

export default ActionButtons;
