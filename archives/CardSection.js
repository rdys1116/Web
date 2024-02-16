import React from 'react';
import { Link } from 'react-router-dom';
import CardContainer from '../frontend/src/component/Display-Card/CardContainer';

// this a type of a wrapper component which will have a link as heading and a netflix scroll cards section
export default function CardSectionWithHeading(props){
    return (
        <section>
            <Link to={{
                pathname: props.link.pathname,
                state: props.link.state
            }}>
                <h1>{props.link.title}</h1>
            </Link>
            {
                <CardContainer
                movies={props.cards.movies}
                netflixScroll = {props.cards.netflixScroll}
                button={{
                    onClick: props.cards.onClick,
                    text: <i className="fas fa-angle-double-right" name={props.cards.name}></i>
                }}/>
            }
        </section>
    )
}