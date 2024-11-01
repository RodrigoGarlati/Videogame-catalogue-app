import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail, deleteGames } from "../../redux/actions";
import NavBar from '../NavBar/NavBar'
import './gamedetail.css'

export default function Gamedetail(){
    let {id} = useParams()
    const dispatch = useDispatch()
    const [created, setCreated] = useState({
        created: false
    })

    const [delStatus, setDelStatus] = useState({
        change: false,
        status: ''
    })
    const game = useSelector(state => state.gameDetail)
    const delGame = useSelector(state => state.deleteGame)

    useEffect(()=>{
        dispatch(getGameDetail(id))
        if(id.length == 36){
            setCreated({created: true})
        }
    } , [])

    useEffect(()=>{
        setDelStatus({
            ...delStatus,
            status: delGame
        })
    }, [delGame])
    
    function handleDelete(){
        dispatch(deleteGames(game.id))
        setDelStatus({
            ...delStatus,
            change: true
        })
    }

    return(
        <div className="gamedetail">
            {typeof game !== 'object' ? <h1 className="status">{game}</h1> :
                <div className="game-detail-container">
                    {game.created &&
                        <>
                            {delStatus.change && <p className="status">{delStatus.status}</p>}
                            <div className="detailbuttons">
                            <button className="detail-button deletebutton" onClick={e => handleDelete()} disabled={game.created == false || delStatus.status !== ''? true : false }>DELETE GAME</button>
                                <Link to={`/gamedetail/${game.id}/edit`}>
                                    <button className="detail-button editbutton">EDIT GAME</button>
                                </Link>
                            </div>
                        </>
                    }
                    <div className="omgcontainer">
                        <div className="nameimg">
                            <h1 className="detailname">{game.name}</h1>
                            <p className="detailrating">Rating: {game.rating}</p>
                            <img className="detailimg" src={game.image}></img>
                        </div>
                        <div className="detaildescription">
                            <p>{game.description}</p>
                            <p>Release date: {game.releaseDate}</p>
                            <p>Genres: {game.genre}</p>
                            <p>Platforms: {game.platforms}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    
    )
}