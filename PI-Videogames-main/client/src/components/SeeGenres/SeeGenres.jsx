import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres} from "../../redux/actions";
import GenreCard from "../GenreCard/GenreCard";
import NavBar from '../NavBar/NavBar'
import './seegenres.css'


export default function SeeGenres(){
    const dispatch = useDispatch()
    
    const genres = useSelector(state => state.allGenres)

    useEffect(()=>{
        dispatch(getAllGenres())
    },[])

    return (
        <div className="seegenres">
            <NavBar/>
            <h1 className="genrestitle">Genres</h1>
            <br/>
            <div className="genrescont">
                {genres && genres.map(genre => (
                    <div key={genre.id}>
                        <GenreCard name={genre.name} image={genre.image} games={genre.games} />
                    </div>
                ))}
            </div>
        </div>
    )
}