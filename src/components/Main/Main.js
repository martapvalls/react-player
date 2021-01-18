import React, { useState, useEffect} from 'react'
import './Main.css'
import Loader from 'react-loader-spinner'
import Films from '../Films/Films'
import Search from '../Search/Search'

//redux
import { useSelector, useDispatch} from 'react-redux'
import { getUserInfo } from '../../redux/actions/mainActions'

const Main = ({history}) => {
    const { token } = sessionStorage

    //state
    const [favs, setFavs ] = useState([])
    const [fav, setFav] = useState({})
    const [searchQuery, setSearchQuery] =useState('')
    const [searchResults, setSearchResults ] = useState([])

    
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

    //get favs when user is retrieved
    useEffect(() => {
        if(user){
            getFavs()
        }
    }, [user])

    //update the compo when user add or removes favs
    useEffect(() => {
        if(fav.id){
            handleFav()
        }
    }, [fav])
    
    //update the compo when user search films
    useEffect(() => {
        handleSearch()
    }, [searchQuery])


    //add or remove films from favs 
    const handleFav = () => {
        const indexFilm = favs.indexOf(fav)
        if(indexFilm !== -1){
            let favourites = favs.filter((item) => item.id !== fav.id)
            setFavs(favourites)
            setFav({})
        } else {
            setFavs([...favs, fav])
            setFav({})
        }
    }

    // get results from a query search
    const handleSearch = () =>{
        const query = searchQuery.toLocaleLowerCase()
        let results = contents.filter((item) => item.title.toLocaleLowerCase().includes(query))
        setSearchResults(results)
    }

    return (  
        <div className="main__container">
            {loading && 
                <Loader
                    type="Puff"
                    color="rgb(132, 198, 255)"
                    height={100}
                    width={100}
            />}
            <Search setSearchQuery={setSearchQuery}/>
            {searchQuery && <Films title="Your search" message="There aren't results for this search" searchResults={searchResults} setFav={setFav} />}
            <Films title="Your Favs" message="There aren't favourites yet" favs={favs} setFav={setFav} /> 
            <Films title="Available" message="There aren't available films yet" contents={contents} setFav={setFav} /> 
        </div>
    );
}
 
export default Main;