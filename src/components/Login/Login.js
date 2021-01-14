import React, { useState } from 'react';
import './Login.css';

//redux
import { userLogin } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    //state
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

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

        //check errors

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
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form__fields">
                        <input type="submit" className="form__submit" value="send" />
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;