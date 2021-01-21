import React from 'react'
import Film from '../Film/Film'
import './Films.css'

const Films = ({title, message, favs, setFav, category, searchResults}) => {
    return (  
        <div className="films__container">
            <h2 className="films__title"> {title} </h2>
            {title === 'Your Favs' && <ul className="films__list">
                {favs.length > 0 ? ( 
                    favs.map(film => (
                        <li key={film.id} className="films__item">
                            <Film film={film} favs={favs} setFav={setFav}/>
                        </li>
                    ))
                ): <p> {message}</p>}
            </ul>} 

            <ul className="films__list">
            {category && category.length > 0 ? ( 
                category.map(film => (
                    <li key={film.id} className="films__item">
                        <Film film={film} favs={favs} setFav={setFav}/>
                    </li>
                ))
            ): <p>There aren't avilable films yet</p>}
            </ul>

            {title === 'Your search' && <ul className="films__list">
            {searchResults.length > 0 ? ( 
                searchResults.map(film => (
                    <li key={film.id} className="films__item">
                        <Film film={film} favs={favs} setFav={setFav}/>
                    </li>
                ))
            ): <p>There aren't avilable films with this title</p>}
            </ul>}
            
        </div>
    );
}
 
export default Films;