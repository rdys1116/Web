import React from 'react';

import useManageWatchedSeasons from './Logic/ManageSeasonInfo';
import Button from '../../MediaDetails/Buttons';
import EpisodeDetails from '../EpisodeInfo/EpisodeDetails';
import Loading from '../../Preloader/Loading';
import useHandleWatchLater from '../../MoviesDetails/WatchLaterLogic/useHandleWatchLater';
import useMediaQueries from '../../../common-functions/useMediaQueries';

// component which display the checkbox and progress bar in the tv show details page
const SeasonsInfo = (props) => {
    const { shows: TvInfo, IsAnime } = props;

    const isMaxWidth800 = useMediaQueries('(max-width: 800px)');
    const isMinWidth600 = useMediaQueries('(min-width: 600px)');
    const isMaxWidth370 = useMediaQueries('(max-width: 370px)');

    const [ 
        isTracked, isCompleted,
        handleTrackedBtn, handleCompletedBtn,
        seasonStatus, episodeStatus, watchStatus,
        displayEpisodes, episodeData
    ] = useManageWatchedSeasons(TvInfo, IsAnime);

    const [handleSaveBtn, isSaved] = useHandleWatchLater(TvInfo, IsAnime ? 'anime' : 'tv show');
    
    return (
        <>
            {
                Object.keys(watchStatus).length <= 0 ?
                <Loading /> :
                (
                    <section>
                        <section style={{
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'center',
                            margin: '10px auto'
                        }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                Seasons
                            </span>
                            <Button
                            onClick={handleTrackedBtn}
                            displayText={isTracked ? 'Untrack' : null}
                            tooltip={'message'}
                            />
                            <Button
                            customize='button-icon'
                            onClick={handleCompletedBtn}
                            displayText={isCompleted? <i className="fas fa-check-circle" /> : <i className="far fa-check-circle" /> }
                            />
                            <Button
                            customize='button-icon'
                            onClick={handleSaveBtn}
                            displayText={isSaved?  <i className="fas fa-bookmark" />:  <i className="far fa-bookmark" />}
                            />
                            {/*TODO Add a button which will add next episode to the watched list which will save some clicks */}
                        </section>
                        {
                            TvInfo.seasons.map((season, index) => {
                                let seasonNumber = index;
                                let progressBarCount = 0;
                                let seasonName = season?.name;

                                if(isMaxWidth370){
                                    console.log('q')
                                    seasonName = season?.name.length > 16 ?
                                    season?.name.slice(0, 13) + '...' : season?.name
                                } else if(isMinWidth600 && isMaxWidth800){
                                    console.log('500')
                                    seasonName = season?.name.length > 45 ?
                                    season?.name.slice(0, 42) + '...' : season?.name
                                } else {
                                    console.log('else')
                                    seasonName = season?.name.length > 23 ?
                                    season?.name.slice(0, 20) + '...' : season?.name
                                }
                                
                                if(watchStatus?.[season?.name]?.episodes){
                                    progressBarCount = (
                                        watchStatus?.[season?.name]?.episodes?.findIndex(value => value === false) >= 0 ?
                                        watchStatus?.[season?.name]?.episodes?.findIndex(value => value === false) :
                                        season?.episode_count
                                    );
                                }
                                
                                if(!TvInfo.seasons[0].name.includes('Special')){
                                ++seasonNumber;
                                }

                                return (
                                    <div
                                    onClick={ (e) => displayEpisodes(seasonNumber, e) }
                                    className='season-info'
                                    key={season?.id}
                                    >
                                        <input 
                                        type='checkbox'
                                        checked={watchStatus?.[season?.name]?.isDone}
                                        disabled={(+season?.episode_count === 0)}
                                        onChange={ () => seasonStatus(season?.name) }
                                        />
                                        <span value={season?.season_number}>
                                            { seasonName }
                                        </span>
                                        <progress 
                                            value={progressBarCount}
                                            max={season?.episode_count}
                                        />
                                        <span>
                                            {progressBarCount}/{season?.episode_count}
                                        </span>
                                        <section className='episode-info-container'>
                                            {
                                                episodeData.season_number === seasonNumber &&
                                                <EpisodeDetails 
                                                info={episodeData}
                                                status={watchStatus[season?.name].episodes}
                                                handleSelect={episodeStatus}
                                                />
                                            }
                                        </section>
                                    </div>
                                )
                            })
                        }
                    </section>
                )
            }
        </>
    );
}

export default SeasonsInfo;