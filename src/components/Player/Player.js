import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

//redux
import { getFilm } from '../../redux/actions/playerActions'
import { useDispatch, useSelector } from 'react-redux'

const Player = ({match, history}) => {
    //state
    const [ playerId, setPlayerId ] = useState(match.params.id)

    //state of redux store
    const token = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.player.loading)
    const film = useSelector((state) => state.player.film)

    //call player redux action
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(!token){
            history.push('/login')
        } else {
            const retrieveFilm = () => dispatch( getFilm(token, playerId) )
            retrieveFilm()
            console.log(film)
        }
    }, [])

    //get duration film in hour:minutes:seconds format
    const getHourTime = (time) => {
        let hours = Math.floor( time / 3600 );  
        let minutes = Math.floor( (time % 3600) / 60 );
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        let result = `${hours}:${minutes}:${seconds} h`
        return result
    }

    return (  
        <div className="player__container">
            {loading && 
                <Loader
                    type="Puff"
                    color="rgb(132, 198, 255)"
                    height={100}
                    width={100}
            />} 
            <h2 className="player__title"> <Link to={'/'} className="player__back"> <FontAwesomeIcon icon={faArrowAltCircleLeft} size="1x"/> </Link> {film.title}  </h2>
            
            <div className="player__info">
                
                <span> Gender: {film.section} </span>
                <span> Duration: {getHourTime(film.duration)} </span>
                <p>Rating : {film.rating}</p>
                <img src={film.cover} className="player__img" alt="cover"/>

            </div>        
            
            <ReactPlayer className='react-player'
                url={film.url}
                width='40%'
                controls
                config={{
                    file: {
                    forceHLS: true,
                    }
            }}
  />


        </div>
    );
}
 
export default Player;