import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getInitialGenres } from "../../redux/actions";
import GenreCard from "../GenreCard/GenreCard";


export default function SeeGenres(){
    const dispatch = useDispatch()
    
    const genres = useSelector(state => state.initialGenres)

    useEffect(()=>{
        dispatch(getInitialGenres())
    },[])

    return (
        <div>
            <h2>Genres: </h2>
            <div>
                {genres && genres.map(genre => (
                    <div key={genre.id}>
                        <GenreCard name={genre.name} image={genre.image} games={genre.games} />
                    </div>
                ))}
            </div>
        </div>
    )
}