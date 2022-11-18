import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
//import { getAllGames } from "../../redux/actions";
import './home.css'
import Show from "../Show/Show";
import Organizer from "../Organizer/Organizer";


const Home = function(){
    const games = useSelector(state => state.Games)
    const searched = useSelector(state => state.searchedGames)
    const [renderGames, setRender] = useState([])
    let toOrder = false 

    
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
        toOrder = true
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
        <div className="cards">
            <SearchBar games={toOrder}/>
            <Show/>
            <Organizer/>
            <h2>VIDEOGAMES</h2>
            <div className="cardscontainer">
                {renderGames? renderGames.slice(firstIndex, firstIndex+15).map(game => (
                    <Link to={`/gamedetail/${game.id}`}>
                        <div key={game.id}>
                            <GameCard name={game.name} genres={game.genre} image={game.image} />
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


// ALTERNATIVA DE PAGINADO 

// const [pages, setPages] = useState({
    //     pages: [],
    //     numPages: [],
    //     actualPage: 0
    // })

    // useEffect(()=>{
    // for (let i = 0; games.length ; i++){
    //      let ja = games.splice(0,15)
    //      setPages((state) => ({
    //          ...state,
    //          pages: [...state.pages, ja]
    //      }))
    //      setPages((state)=> ({
    //          ...state,    
    //          numPages: state.numPages.concat(i)
    //      }))
    //  }
    // },[games])

    // function handleclick(e){
    //     setPages((prev) => ({
    //         ...prev,
    //         actualPage: parseInt(e.target.innerText)-1
    //     }))
    // }


    //RETURN
/* {pages.numPages? pages.numPages.map(page => (<a onClick={e => handleclick(e)}> {page+1} </a>)) : null} */
/* {pages.pages[pages.actualPage]? pages.pages[pages.actualPage].map(game => (
                    <Link to={`/gamedetail/${game.id}`}>
                        <div key={game.id}>
                            <GameCard name={game.name} genres={game.genre} image={game.image}/>
                        </div>
                    </Link>
                )): null} */