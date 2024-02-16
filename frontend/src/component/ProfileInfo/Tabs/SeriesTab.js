import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../../config';
import Card from '../../Display-Card/Card/Card';
import Analytics from '../Analytics';

const SeriesTab = React.memo((props) => {
    const { show, title, watchMinutes } = props;
    let status;
    
    return (
        <section className='tab-container'>
            <h1>{ `${title} (${show.length})` }</h1>
            <Analytics watchMinutes={ watchMinutes } />
            {
                show.map(series => {
                    return (
                        <React.Fragment key={series.series_id}>
                            
                            
                            {
                                status !== series.status &&
                                <h3>
                                    {
                                        status = status !== series.status ? 
                                        series.status : null
                                    }
                                </h3>
                            }
                            <section className='tv-show-cards'>
                                <Link
                                to={`/tv/${series.series_id}`}
                                className='profile-media-cards' >
                                    <Card
                                    title={{
                                        text: series.name,
                                        sizeLimit: ( window.innerWidth < 1100 ? 12 : 20 ),
                                        titleClassName: `${series.completed_series}`
                                    }}
                                    image={`${IMAGE_URL}/${series.poster}`} >

                                        <section className='progress-box'>
                                            <progress
                                            value={series.watched_episodes}
                                            max={series.total_episodes}
                                            className='progress-bar'/>
                                            <span>
                                                {`${series.watched_episodes}/${series.total_episodes}`}
                                            </span>
                                        </section>

                                    </Card>
                                </Link>
                            </section>
                        </React.Fragment>
                    )
                })
            }
        </section>
    )
});

export default SeriesTab;
