import { combineReducers } from 'redux'
import authReducer from './authReducer'
import mainReducer from './mainReducer'
import playerReducer from './playerReducer'

export default combineReducers({
    auth: authReducer,
    main: mainReducer,
    player: playerReducer
})
