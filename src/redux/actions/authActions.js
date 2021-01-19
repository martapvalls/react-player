import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from '../types'
import axios from 'axios'
import md5 from 'md5'

const apiUrl = 'https://dev.perseo.tv/ws'

//function and actions for user login
export function userLogin(user){
    return async(dispatch) => {

        const params = new URLSearchParams();
        params.append('user', user.user)
        params.append('pass', md5(user.pass))
        params.append('device', "Web")

        dispatch( login() )
        try {
            const response = await axios.post(`${apiUrl}/Login.php`, params, { headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}})
            
            if(response.data.error){
                dispatch(loginError(true))
                return
            }
            sessionStorage.setItem("token", response.data.token)
            dispatch(loginSuccess(response.data.token))
        } catch (error) {
            dispatch(loginError())
        }
    }
}

const login = () => ({
    type: LOGIN_USER
})

//right credentials to login
const loginSuccess = token => ({
    type: LOGIN_USER_SUCCESS,
    payload: token
})

//wrong credentials, login error
const loginError = () => ({
    type: LOGIN_USER_ERROR,
    payload: true
})