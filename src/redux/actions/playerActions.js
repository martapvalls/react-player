import {
    GET_FILM,
    GET_FILM_SUCCESS,
    GET_FILM_ERROR
} from '../types'

import axios from 'axios'

const apiUrl = 'https://dev.perseo.tv/ws'

//function and actions for user login
export function getFilm(token, id){
    return async(dispatch) => {

        const params = new URLSearchParams();
        params.append('token', token)
        params.append('id', id)
        params.append('device', "Web")

        dispatch( retrieveFilm() )
        try {
            const response = await axios.post(`${apiUrl}/Play.php`, params, { headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}})
            
            if(response.data.error){
                dispatch(retrieveFilmError())
                return
            }
            dispatch(retrieveFilmSuccess(response.data))
        } catch (error) {
            dispatch(retrieveFilmError())
        }
    }
}

const retrieveFilm = () => ({
    type: GET_FILM
})

//retrieving films succesfull
const retrieveFilmSuccess = film => ({
    type: GET_FILM_SUCCESS,
    payload: film
})

//wrong params
const retrieveFilmError = () => ({
    type: GET_FILM_ERROR,
    payload: true
})