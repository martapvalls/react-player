import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from '../types'

const initialState = {
    token: sessionStorage.getItem("token"),
    error: false,
    loading: false
}

function authReducer(state = initialState, action){
    switch (action.type) {
        case LOGIN_USER: 
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: sessionStorage.getItem("token")
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;