import React, { useState } from 'react'
import './Search.css'
import Error from '../Error/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Search = ({setSearchQuery}) => {
    //state
    const [ query, setQuery ] = useState('')
    const [ error, setError ] = useState(false)

    // get the value of query, validate that isn't empty and send to main component
    const searchQuery = () => {
        if(query.trim() === ''){
            setError(true)
            return
        }
        setError(false)

        setSearchQuery(query)
        setQuery('')
    }

    //get the search with enter button instead of click 
    const onKeyPressHandler = e => {
        if (e.charCode === 13) {
          searchQuery()
        }
    }

    return (
        <div className="search__container">
            <div className="search__inputs">
                <input 
                    className="search__input"
                    type="text"
                    name="query"
                    placeholder="search films by title"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={searchQuery} className="search__btn"> <FontAwesomeIcon icon={faSearch} size="2x"/> </button>
            </div>
            {error && <Error message="Empty search"/>}
        </div>  
    );
}
 
export default Search;