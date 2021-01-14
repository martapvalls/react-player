import React from 'react';
import './Login.css';

const Login = () => {
    return (  
        <div className="container">
            <div className="container__form">
                <h1 className="form__title">Login</h1>

                <form>
                    <div className="form__fields">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your E-mail"
                        />
                    </div>
                    <div className="form__fields">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;