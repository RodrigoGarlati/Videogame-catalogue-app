import React from "react";
import './GameCard.css'

export default function GameCard(props){
    

    return(
        <div className="gamecard">
            <h3>{props.name}</h3>
            <label>Generos: </label>
            <p>{props.genres}</p>
            <img src={props.image} alt={props.image} className="gameImage"></img>
        </div>
    )
}