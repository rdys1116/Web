import React from 'react';
import useMediaQueries from '../../../common-functions/useMediaQueries';

function ManageEpisodeStatus(params){
    const isCurrentSeasonSelected = params.info.name === params.status.lastSeasonName;
    let lastEpisodeWatched = -1;

    if(isCurrentSeasonSelected){
        lastEpisodeWatched =  params.status.lastEpisodeWatched;
    }
    return [
        lastEpisodeWatched
    ];
}

const EpisodeDetails = (props) => {
    const status = props.status;
    const episodes = props.info.episodes;

    const isMaxWidth800 = useMediaQueries('(max-width: 800px)');
    const isMinWidth600 = useMediaQueries('(min-width: 600px)');
    const isMaxWidth370 = useMediaQueries('(max-width: 370px)');


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Episode Number</th>
                        <th>Episode Name</th>
                        <th>Aired On</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((episodeInfo, index) => {
                        let episodeName = episodeInfo.name;

                        if(isMaxWidth370){
                            episodeName = episodeInfo.name.length > 16 ?
                            episodeInfo.name.slice(0, 13) + '...' : episodeInfo.name
                        
                        } else if(isMinWidth600 && isMaxWidth800){
                            episodeName = episodeInfo.name.length > 45 ?
                            episodeInfo.name.slice(0, 42) + '...' : episodeInfo.name
                        
                        } else {
                            episodeName = episodeInfo.name.length > 23 ?
                            episodeInfo.name.slice(0, 20) + '...' : episodeInfo.name
                        }
                        return (
                            <tr key={episodeInfo.id} className='episode-info'>
                                <td>S{episodeInfo.season_number}E{episodeInfo.episode_number}</td>
                                <td>{episodeName}</td>
                                <td>{episodeInfo.air_date}</td>
                                <td>
                                    <input 
                                        type='checkbox' 
                                        checked={status[index] || false}
                                        onChange={() => props.handleSelect(index, props.info)} 
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default EpisodeDetails;
