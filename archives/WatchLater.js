import React, { useState } from 'react';

// import './WatchLater.css';

const WatchLater = () => {
    const [WatchLater, setWatchLater] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setWatchLater(!WatchLater);
    }
    return (
        <div className='trackBtn'>
            <button onClick={handleClick}>
                {
                    WatchLater? 'Saved': 'Save'
                }
            </button>
        </div>
    );
}

export default WatchLater;

// Watched 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getUrl } from '../../common-functions/functions';

// const WatchedButton = props => {
//     let watchedList = localStorage.getItem('watchedMediaIds').split(',');
//     const [Watched, setWatched] = useState(props.recentWatched.tracked);
//     console.log(props.recentWatched)
//     useEffect(() => {
//         if(props.update) handleClick();
//     }, [props.update])

//     useEffect(() => {
//         setWatched(props.recentWatched.tracked);
//     }, [props.recentWatched])

//     const handleClick = e => {
//         if(e) e.preventDefault();
//         setWatched(props.recentWatched.tracked);
//         console.log(props.recentWatched.tracked)
//         const listItems = {
//             userId: localStorage.getItem('userId'),
//         }
        
//         if(props.recentWatched.tracked){
//             console.log('saved')
//             if(watchedList.includes(props.details.id.toString())) return;
//             axios.get(getUrl(1,`${props.mediaType}/${props.details.id}`))
//             .then(res => {
//                 listItems.completed_series = props.recentWatched.completed;
//                 listItems[`${props.mediaType}Id`] = res.data.id;
//                     listItems.runtime = getTotalRuntimeOfSeries(
//                         res.data.seasons,
//                         getAverageRunTime(res.data.episode_run_time)
//                     );
//                     listItems.seasons = {
//                         name: props.recentWatched.name,
//                         episodes: props.recentWatched.episodes
//                     }
//                     console.log(listItems)
//                     console.log(res.data);

//                     watchedList.push(props.details.id);
//                     console.log(watchedList);
//                     localStorage.setItem('watchedMediaIds', [...watchedList]);
//                     return listItems;
//                 })
//                 .then(items => {
//                     axios.post(`http://localhost:4000/list/track/${props.mediaType}`, items)
//                     .then(res => console.log(res))
//                     .catch(err => console.log(err));
//                     console.log('saved')
//                 })
//                 .catch(err => console.log(err));
//             } else if(props.recentWatched.tracked === false) { 
//                 listItems[`${props.mediaType}Id`] = props.details.id;
//                 axios.post(`http://localhost:4000/list/untrack/${props.mediaType}`, listItems)
//                 .then(res => {
//                     console.log(res.data);
//                     console.log('removed')
//                     let isFiltered;
//                     watchedList = watchedList.filter(id => {
//                         isFiltered = id === props.details.id.toString()
//                         console.log(isFiltered)
//                         return !isFiltered;
//                     });
//                     console.log(watchedList);
//                     if(isFiltered) localStorage.setItem('watchedMediaIds', [...watchedList]);
//                     // console.log(localStorage.getItem('watchedMediaIds'));
//                 })
//                 .catch(err => console.log(err));
//         }
//     }
//     console.log(props.recentWatched.tracked);
//     console.log(Watched);
//     return (
//         <div className={props.className}>
//             <button className='watchedIcon' onClick={handleClick}>
//                 {
//                     Watched?
//                     <i className="fas fa-check-circle"></i>:
//                     <i className="far fa-check-circle"></i>
//                 }
//             </button>
//         </div>
//     );
// }

// export default WatchedButton;
