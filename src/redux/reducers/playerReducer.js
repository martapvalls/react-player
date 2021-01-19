import {
    GET_FILM,
    GET_FILM_SUCCESS,
    GET_FILM_ERROR
} from '../types'

const initialState = {
    film: {},
    error: false,
    isloading: false
}

function playerReducer(state = initialState, action){
    switch (action.type) {
        case GET_FILM:
            return {
                ...state,
                isloading: true
            }
        case GET_FILM_SUCCESS:
            return {
                ...state,
                isloading: false,
                film: action.payload
            }
        case GET_FILM_ERROR:
            return {
                ...state,
                error: true,
                isloading: false
            }
        default:
            return state;
    }
}

export default playerReducer;