import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../frontend/src/config';

import MainImage from '../../frontend/src/component/MainImage/MainImage';
import CardSectionWithHeading  from '../../component/Display-Card/CardSection';
import useFetchPageDetails from './Logic/fetchDetails';
import './LandingPage.css';

// UI for the landing page
function LandingPage(){
    const [BgImg, handleClick, sections] = useFetchPageDetails();
    let displayElement = (
        <div style={{ textAlign: 'center' }}>Loading...</div>
    )
    console.log(BgImg)
    if(BgImg){
        displayElement = (
            <div id='landingPage'>
                <section className='mainImageSection'>
                    {/* <h1 className='mainImageHeading'>Airing On TV</h1> */}
                    <Link 
                    to={`/tv/${BgImg.id}`}
                    style={{ textDecoration: 'none'}} >
                        <MainImage 
                            image={`${IMAGE_URL}${BgImg.backdrop_path}`}
                            title={
                                BgImg.name || BgImg.title || 
                                BgImg.original_name || BgImg.original_title
                            }
                            summary={BgImg.overview}/>
                    </Link>
                </section>
                {
                    sections.map(section => {
                        return (
                            <CardSectionWithHeading 
                                key={section.link.title}
                                link={section.link}
                                cards={{
                                    movies: section.movies,
                                    onClick: handleClick,
                                    netflixScroll: true,
                                    name: section.name
                                }}
                            />
                        )
                    })
                }
            </div>
        )
    }
    return displayElement;

}

export default LandingPage;