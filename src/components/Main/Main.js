import React, { useState, useEffect} from 'react'
import './Main.css'
import Loader from 'react-loader-spinner'
import Films from '../Films/Films'

//redux
import { useSelector, useDispatch} from 'react-redux'
import { getUserInfo } from '../../redux/actions/mainActions'

const Main = ({history}) => {
    const { token } = sessionStorage

    //state
    const [favs, setFavs ] = useState([])
    const [fav, setFav] = useState({})

    
    //state of redux store
    const loading = useSelector((state) => state.main.loading)
    const user = useSelector((state) => state.main.user)
    const contents = useSelector((state) => state.main.contents)


    const dispatch = useDispatch()

    useEffect(() => {
        if(!token){
            history.push('/login')
        } else {
            const retrieveUser = () => dispatch( getUserInfo(token) )
            retrieveUser()
        }
    }, [history, token])

    // get favs from user and set new property isfav
    const getFavs = () => {
        let favourites = contents.filter((item) => user.favs.includes(item.id))
        favourites.forEach(favourite => favourite.isFav = true)
        setFavs(favourites)
    }

    useEffect(() => {
        if(user){
            getFavs()
        }
    }, [user])

    useEffect(() => {
        if(fav.id){
            handleFav()
        }
        console.log('hello')
    }, [fav])
    
    //add or remove films from favs 
    const handleFav = () => {
        const indexFilm = favs.indexOf(fav)
        if(indexFilm !== -1){
            let favourites = favs.filter((item) => item.id !== fav.id)
            setFavs(favourites)
            setFav({})
        } else {
            let favourites = favs
            favourites.push(fav)
            setFavs(favourites)
            setFav({})
        }
    }

    return (  
        <div className="main__container">
            {loading && <Loader
                        type="Puff"
                        color="rgb(132, 198, 255)"
                        height={100}
                        width={100}
                    />}
            <Films title="Your Favs" message="There aren't favourites yet" favs={favs} setFav={setFav} /> 
            <Films title="Available" message="There aren't available films yet" contents={contents} setFav={setFav} /> 
        </div>
    );
}
 
export default Main;