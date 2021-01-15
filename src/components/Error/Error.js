import React from 'react';
import './Error.css'

const Error = ({message}) => {
    return (  
        <p className="error"> {message} </p>
    );
}
 
export default Error;