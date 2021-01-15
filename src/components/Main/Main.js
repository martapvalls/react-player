import React, {useEffect} from 'react';

const Main = ({history}) => {
    const { token } = sessionStorage

    useEffect(() => {
        if(!token){
            history.push('/login')
        }
    }, [])

    return (  
        
        <h1>Hello from main</h1>
    );
}
 
export default Main;