import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGames, getInitialGenres } from "../../redux/actions";
import './landing.css'


const Landing = () => {
    // const dispatch = useDispatch()

    // const pregames = useSelector(state => state.preGames)

    // useEffect(()=>{
    //     dispatch(getInitialGenres())
    //     dispatch(getAllGames())
    // },[])
    return(
        <div className="container">
            <h1 className="title">Bienvenido a videogames ultracool</h1>
            <div className="holi">
                <Link to="/home">
                    <button>ENTRAR</button>           
                </Link>
            </div>
        </div>
    )
}

export default Landing