import React from "react";
import './genreCard.css'

export default function GenreCard(props){

    return(
        <div className="genrecard">
            <div >
                <h3 className="gcardtitle">{props.name}</h3>
            </div>
            <div className="exgamesdiv">
                <label>Example games: </label>
                <p>{props.games}</p>
            </div>
            <br/>
            <div>
                <img className='gcardimg' src={props.image} alt={props.image} />
            </div>
        </div>
    )
}