import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loader } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../common/Card/Card";
import './home.css'
import Show from "../Show/Show";
import Organizer from "../Organizer/Organizer";
import Filter from "../Filter/Filter";
import Loader from "../Loader/Loader"


const Home = function(){
    const games = useSelector(state => state.Games)
    const totalGames = useSelector(state => state.totalGames)
    const searched = useSelector(state => state.searchedGames)
    const loading = useSelector(state => state.loader)
    const dispatch = useDispatch()
    const [renderGames, setRender] = useState([])
    const [firstRender, setFirstRender] = useState(true)
    
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let page = searchParams.get("page")
    if (!page) page = 1

    useEffect(()=>{
        setFirstRender(false)
    },[])

    useEffect(()=>{
        setRender(searched)
    },[searched])
    
    useEffect(()=>{
        if (firstRender) return
        if (games.length){
            setRender(games)
            dispatch(loader(false))
        }
     },[games])

    function numberOfPages(){
        let amountOfPages = Math.ceil(totalGames / 15)
        return Array.from({ length: amountOfPages }, (_, index) => index + 1);
    }

    return(
        <div className="home">
            <div className="searchCont">
                <SearchBar 
                    page={page}
                />
            </div>
            <div className="show-orgCont">
                <Show 
                    page={page}
                />
                <Organizer/>
                <Filter/>
            </div>
            <h1 className="cards-title">VIDEOGAMES</h1>
            <div className="omgcont">
                {loading ? 
                    <div className="loader-cont">
                        <Loader/>
                    </div> 
                    : 
                    <div>
                        <div className="cards-container">
                            {renderGames.map(game => (
                                <Link className="gamecardlink" to={`/gamedetail/${game.id}`}>
                                    <div key={game.id}>
                                        <Card 
                                            id={game.id} 
                                            title={game.name}
                                            infoTitle={'Genres'}
                                            info={game.genre} 
                                            image={game.image} 
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="pagescontainer">
                            {renderGames? numberOfPages().map(e => (
                            <Link className="pagelink" to={`/home?page=${e}`}>
                                <p 
                                    className={`pages ${page == e ? 'page-selected' : ''}`}
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