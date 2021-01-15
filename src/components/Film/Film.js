import React, { Fragment } from 'react';
import './Film.css'

const Film = ({fav}) => {
    return (  
        <Fragment>
            <p> {fav.title} </p>
            <img src={fav.cover} alt="film" className="film__img"/>
        </Fragment>
    );
}
 
export default Film;