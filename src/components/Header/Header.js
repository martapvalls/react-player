import React from 'react';
import './Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector((state) => state.main)

    return ( 
        <nav className="header">
            <h1 className="header__title">React Player</h1>
            {user && user.name ? 
            <div className="user__container">
                <img className="user__avatar"src={user.avatar} alt="avatar" />
                <h1>Hello {user.name}</h1>
            </div>
            : 
            null}
        </nav>
     );
}
 
export default Header;