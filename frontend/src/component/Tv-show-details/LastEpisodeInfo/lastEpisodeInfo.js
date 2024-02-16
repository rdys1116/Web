import React from 'react';

const lastEpisodeInfo = (TvInfo) => {    
    if(TvInfo.status === 'Ended'){
        return (
            <section>
                <p><strong>Last Aired On: </strong> {TvInfo.last_air_date}</p>
            </section>
        )
    } else {
        return (
            <div>
                <section style={{ margin: '10px auto'}}>
                    <h2 style={{ fontSize: '1.5rem'}}>Last Episode Aired</h2>
                    <article style={{ margin: 'auto 1rem'}}>
                        <p><strong>Episode Name: </strong>{TvInfo.last_episode_to_air.name}</p>
                        <p><strong>Season: </strong>{TvInfo.last_episode_to_air.season_number}</p>
                        <p><strong>Episode Number: </strong>{TvInfo.last_episode_to_air.episode_number}</p>
                        <p><strong>Aired On: </strong>{TvInfo.last_episode_to_air.air_date}</p>
                    </article>
                </section>
                <section style={{ margin: '10px auto'}}>
                    <h2 style={{ fontSize: '1.5rem'}}>Next Episode To Air</h2>
                    <article style={{ margin: 'auto 1rem'}}>
                        {
                            TvInfo.next_episode_to_air? (

                                <>
                                    <p>
                                        <strong>Episode Name: </strong>
                                        {TvInfo.next_episode_to_air.name}
                                    </p>
                                    <p>
                                        <strong>Season: </strong>
                                        {TvInfo.next_episode_to_air.season_number}
                                    </p>
                                    <p>
                                        <strong>Episode Number: </strong>
                                        {TvInfo.next_episode_to_air.episode_number}</p>
                                    <p>
                                        <strong>Aired On: </strong>
                                        {TvInfo.next_episode_to_air.air_date}
                                    </p>
                                </>
                            ): (
                                'No release Data'
                            )
                        }
                    </article>
                </section>
            </div>
        )
    }
}

export default lastEpisodeInfo;
