import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres} from "../../redux/actions";
import Card from "../common/Card/Card";
import './seegenres.css'


export default function SeeGenres(){
    const dispatch = useDispatch()
    
    const genres = useSelector(state => state.allGenres)

    useEffect(()=>{
        dispatch(getAllGenres())
    },[])

    return (
        <div className="seegenres">
            <h1 className="cards-tittle">Genres</h1>
            <div className="cards-container">
                {genres && genres.map(genre => (
                    <div key={genre.id}>
                        <Card 
                            title={genre.name}
                            infoTitle={'Example games'} 
                            info={genre.games} 
                            image={genre.image} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}