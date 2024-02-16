import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord } from '../../../common-functions/helper';

import { IMAGE_URL } from '../../../config';
import Card from '../../Display-Card/Card/Card';

const WatchLaterTab = React.memo((props) => {
    const { media: mediaList } = props;
    let type;
    
    return (
        <section>
            <h1>{ `Watch Later (${mediaList.length})` }</h1>
            {
                mediaList.map((media) => {
                    return (
                        <React.Fragment key={media._id}>
                            {
                                type !== media.media_type &&
                                <h3>
                                    {
                                        capitalizeEveryWord(
                                            type = type !== media.media_type ? 
                                            media.media_type : null
                                        )
                                    }
                                </h3>
                            }
                            <section className='tv-show-cards'>
                                <Link
                                to={`/${media.media_type === 'movie' ? 'movie' : 'tv'}/${media.media_id}`}
                                style={{ textDecoration: 'none'}} >

                                    <Card
                                    title={{
                                        text: media.name,
                                        sizeLimit: ( window.innerWidth < 1100 ? 12 : 20 )
                                    }}
                                    image={`${IMAGE_URL}/${media.poster}`}
                                    />
                                    
                                </Link>
                            </section>
                        </React.Fragment>
                    )
                })
            }
        </section>
    )
});

export default WatchLaterTab;
