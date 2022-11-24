import React from "react";
import './GameCard.css'

export default function GameCard(props){
    

    return(
        <div className="gamecard">
            <div className="cardtext">
                <h3 className="gametitle">{props.name}</h3>
                <div className="genrediv">
                    <label className="genrelabel">Genres: </label>
                    <p className="genres">{props.genres}</p>
                </div>
            </div>
            <br/>
            <img src={props.image} alt={props.image} className="gameimage"></img>
        </div>
    )
}