import React from "react";
import './genreCard.css'

export default function GenreCard(props){

    return(
        <div>
            <div>
                <h3>{props.name}</h3>
            </div>
            <div>
                <img src={props.image} alt={props.image} className="genreImage" />
            </div>
            <div>
                <label>Example games: </label>
                <p>{props.games}</p>
            </div>
        </div>
    )
}