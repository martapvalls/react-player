import React, { useState, useEffect} from 'react';
import './Main.css'
import Loader from 'react-loader-spinner';
import Film from '../Film/Film'

//redux
import { useSelector, useDispatch} from 'react-redux';
import { getUserInfo } from '../../redux/actions/mainActions';

const Main = ({history}) => {
    const { token } = sessionStorage

    //state
    const [favs, setFavs ] = useState([])

    
    //state of redux store
    const loading = useSelector((state) => state.main.loading)
    const user = useSelector((state) => state.main.user)
    const contents = useSelector((state) => state.main.contents)


    const dispatch = useDispatch()

    useEffect(() => {
        if(!token){
            history.push('/login')
        }
    }, [history, token])

    useEffect(() => {
        //call api
        const retrieveUser = () => dispatch( getUserInfo(token) )
        retrieveUser()
    }, [dispatch, token])
    
    const getFavs = () => {
        let favourites = contents.filter((item) => user.favs.includes(item.id))
        console.log(favourites)
        setFavs(favourites)
    }

    useEffect(() => {
        if(user){
            getFavs()
        }
    }, [user])

    return (  
        <div className="main__container">
            {loading && <Loader
                        type="Puff"
                        color="rgb(132, 198, 255)"
                        height={100}
                        width={100}
                    />}
            <div className="favs__container">
                <h2 className="favs__title">Your Favs</h2>
                <ul className="favs__list">
                    {favs.length > 0 ? ( 
                        favs.map(fav => (
                            <li key={fav.id} className="favs__item">
                                <Film fav={fav}  />
                            </li>
                        ))
                    ): <p>There aren't favourites yet</p>}
                </ul>
            </div>

        </div>
    );
}
 
export default Main;