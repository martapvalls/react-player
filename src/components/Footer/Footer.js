import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (  
        <div className="footer">
            <span>You can find us on Github <a href='https://github.com/martapvalls/react-player' target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            </span>
        </div>
    );
}
 
export default Footer;