import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from '../types'

const initialState = {
    user: {},
    contents: [],
    isloading: false
}

function mainReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                isloading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                contents: action.payload.contents,
                isloading: false
            }
        case GET_USER_ERROR:
            return {
                ...state,
                error: true,
                isloading: false
            }
        default:
            return state;
    }
}

export default mainReducer;