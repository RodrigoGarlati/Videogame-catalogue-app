import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail } from "../../redux/actions";

export default function Gamedetail(){
    let {id} = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getGameDetail(id))
    } , [])

    const game = useSelector(state => state.gameDetail)

    return(
        <div>
            <img src={game.image}></img>
            <h2>{game.name}</h2>
            <label>Genres: </label>
            <h5>{game.genre}</h5>
            <p>{game.description}</p>
            <p>{game.releaseDate}</p>
            <p>Rating: {game.rating}</p>
            <p>Platforms: {game.platforms}</p>
        </div>
    )
}