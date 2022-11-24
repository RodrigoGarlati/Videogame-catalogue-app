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


const Home = function(){
    const games = useSelector(state => state.Games)
    const searched = useSelector(state => state.searchedGames)
    const [renderGames, setRender] = useState([])

    
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let page = searchParams.get("page")
    if (!page) page = 0
    const [pages, setPages] = useState(0)
    let firstIndex = page * 15

    useEffect(()=>{
        setRender(searched)
    },[searched])
    
    useEffect(()=>{
        setRender(games)
     },[games])

    useEffect(()=>{
        setPages(Math.ceil(renderGames.length/15))
    }, [renderGames])

    function numberOfPages(pages){
        var i = 1
        var o = []
        while (pages > 0){
            o.push(i)
            pages--
            i++ 
        }
        return o
    }

    return(
        <div className="home">
            <NavBar/>
            <br/>
            <div className="searchCont">
                <SearchBar />
            </div>
            <br/>
            <div className="show-orgCont">
                <Show/>
                <Organizer/>
                <Filter/>
            </div>
            <h1 className="homeTitle">VIDEOGAMES</h1>
            <div className="cardscontainer">
                {renderGames? renderGames.slice(firstIndex, firstIndex+15).map(game => (
                    <Link className="gamecardlink" to={`/gamedetail/${game.id}`}>
                        <div key={game.id}>
                            <GameCard id={game.id} name={game.name} genres={game.genre} image={game.image} />
                        </div>
                    </Link>
                )) : null}
            </div>
            <div>
                {renderGames? numberOfPages(pages).map(e => (
                    <Link to={`/home?page=${e-1}`}>
                        <p>{e}</p>
                    </Link>
                )) : null}
            </div>
        </div>
    )
}

export default (Home)