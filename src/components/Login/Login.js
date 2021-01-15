import React, { useState, useEffect } from 'react';
import './Login.css';
import Error from '../Error/Error';
import Loader from 'react-loader-spinner';

//redux
import { userLogin } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({history}) => {
    //state
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    //state of redux store
    const loading = useSelector((state) => state.auth.loading)
    const error = useSelector((state) => state.auth.error)
    const token = useSelector((state) => state.auth.token)

    useEffect(() => {
        if(token){
            history.push('/')
        }
    }, [token, history])

    //dispatch to call the redux actions
    const dispatch = useDispatch()

    const loginUser = user => dispatch(userLogin(user))

    //when user submit form
    const submitUser = e => {
        e.preventDefault()

        //validate form

        if(email.trim() === '' || password.trim() === ''){
            return
        }
        //login
        loginUser({
            user: email,
            pass: password,
            device: 'Web'
        })
    }

    return (  
        <div className="container">
            <div className="container__form">
                <h1 className="form__title">Login</h1>

                {error && <Error message="⚠ User or Password wrong ⚠"/>}

                <form
                    onSubmit={submitUser}
                >
                    <div className="form__fields">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your E-mail"
                            required
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form__fields">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            required
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form__fields">
                        <input type="submit" className="form__submit" value="send" />
                    </div>
                    {loading && <Loader
                        type="Puff"
                        color="rgb(132, 198, 255)"
                        height={100}
                        width={100}
                    />}
                </form>
            </div>
        </div>
    );
}
 
export default Login;