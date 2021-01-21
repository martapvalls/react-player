import React, { useState, useEffect} from 'react'
import './Main.css'
import Loader from 'react-loader-spinner'
import Films from '../Films/Films'
import Search from '../Search/Search'
import Error from '../Error/Error'

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
    const [categories, setCategories] = useState([])

    
    //state of redux store
    const loading = useSelector((state) => state.main.loading)
    const user = useSelector((state) => state.main.user)
    const contents = useSelector((state) => state.main.contents)
    const error = useSelector((state) => state.main.error)


    const dispatch = useDispatch()

    useEffect(() => {
        if(!token){
            history.push('/login')
        } else {
            const retrieveUser = () => dispatch( getUserInfo(token) )
            retrieveUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            getSections()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    //update the compo when user add or removes favs
    useEffect(() => {
        if(fav.id){
            handleFav()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fav])
    
    //update the compo when user search films
    useEffect(() => {
        handleSearch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    //separate movies by genre and store then in the state
    const getSections = () => {
        let sections = {}
        let sectionsArray = []

        contents.forEach(film => {
            if(!sections[film.section]){
                sections[film.section] = []
            } 
            sections[film.section].push(film)            
        })
        Object.keys(sections).forEach((e) => {
            sectionsArray.push(sections[e])
        });
        setCategories(sectionsArray)
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
            {error && <Error message="error with user information, try again later"/>}
            <Search setSearchQuery={setSearchQuery}/>
            {searchQuery && <Films title="Your search" message="There aren't results for this search" searchResults={searchResults} setFav={setFav} />}
            <Films title="Your Favs" message="There aren't favourites yet" favs={favs} setFav={setFav} /> 
            {categories && categories.length > 1 && <div className="category__container">
                {categories.map((category) => 
                    <Films title={category[0].section} message="There aren't available films yet" category={category} setFav={setFav} />
                )}
                
            </div>}
        </div>
    );
}
 
export default Main;