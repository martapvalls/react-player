import React, { Fragment } from 'react'
import './Film.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Film = ({film, setFav}) => {
    
    const toggleFav = () => {
        film.isFav = !film.isFav
        setFav(film)
    }

    return (  
        <Fragment>
            <p className="film__title"> {film.title} </p>
            <Link to={`/player/${film.id}`}>
                <img src={film.cover} alt="film" className="film__img"/>
            </Link>
            
            <div className="film__fav">
                {film.isFav ? <FontAwesomeIcon icon={faHeart} size="2x" onClick={toggleFav}/> :  <FontAwesomeIcon icon={faHeartBroken} size="2x" onClick={toggleFav}/>}
            </div>
        </Fragment>
    );
}
 
export default Film;