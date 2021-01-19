import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from '../types'

import axios from 'axios'
const apiUrl = 'https://dev.perseo.tv/ws'

export function getUserInfo(token){
    return async(dispach) => {
        const params = new URLSearchParams();
        params.append('token', token)
        params.append('device', "Web")

        dispach(getUser())

        try {
            const response = await axios.post(`${apiUrl}/GetView.php`, params, { headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}})
            dispach( getUserSuccess(response.data))
        } catch (error) {
            getUserError()
        }
    }
}

const getUser = () => ({
    type: GET_USER
})

//right params to get user
const getUserSuccess = user => ({
    type: GET_USER_SUCCESS,
    payload: user
})

//wrong params, error retrieving user
const getUserError = () => ({
    type: GET_USER_ERROR,
    payload: true
})