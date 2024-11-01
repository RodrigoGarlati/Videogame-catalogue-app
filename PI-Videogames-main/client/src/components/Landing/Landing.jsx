import React from "react";
import { Link } from "react-router-dom";
import './landing.css'


const Landing = () => {
    return(
        <div className="landing">
            <div className="textCont">
                <h1 className="title">Welcome to the Videogame catalog app</h1>
                <div className="holi">
                    <Link to="/home">
                        <button className="landing-button">ENTER</button>           
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing