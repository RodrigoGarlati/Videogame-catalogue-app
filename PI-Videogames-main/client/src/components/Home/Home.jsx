import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
import './home.css'
import NavBar from '../NavBar/NavBar'
import Show from "../Show/Show";
import Organizer from "../Organizer/Organizer";
import Filter from "../Filter/Filter";
import Loader from "../Loader/Loader"


const Home = function(){
    const games = useSelector(state => state.Games)
    const totalGames = useSelector(state => state.totalGames)
    const searched = useSelector(state => state.searchedGames)
    const loader = useSelector(state => state.loader)
    const [renderGames, setRender] = useState([])

    
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let page = searchParams.get("page")
    if (!page) page = 1

    useEffect(()=>{
        setRender(searched)
    },[searched])
    
    useEffect(()=>{
        setRender(games)
     },[games])


    function numberOfPages(){
        let amountOfPages = Math.ceil(totalGames / 15)
        return Array.from({ length: amountOfPages }, (_, index) => index + 1);
    }

    return(
        <div className="home">
            <NavBar/>
            <br/>
            <div className="searchCont">
                <SearchBar 
                    page={page}
                />
            </div>
            <br/>
            <div className="show-orgCont">
                <Show 
                    page={page}
                />
                <Organizer/>
                <Filter/>
            </div>
            <h1 className="homeTitle">VIDEOGAMES</h1>
            <div className="omgcont">
                {loader ? <Loader/> : 
                <div>
                    <div className="cardscontainer">
                        {renderGames.map(game => (
                            <Link className="gamecardlink" to={`/gamedetail/${game.id}`}>
                                <div key={game.id}>
                                    <GameCard id={game.id} name={game.name} genres={game.genre} image={game.image} />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="pagescontainer">
                        {renderGames? numberOfPages().map(e => (
                        <Link className="pagelink" to={`/home?page=${e}`}>
                            <p 
                                className={`pages ${page == e ? 'selected' : ''}`}
                            >
                                {e}
                            </p>
                        </Link>
                        )) : null}
                    </div>
                    {!games.length? <h1 className="empty-games">No games founded</h1> : null}
                </div>
                }
            </div>
        </div>
    )
}

export default (Home)