import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, loader } from "../../redux/actions";
import Card from "../common/Card/Card";
import Loader from "../Loader/Loader";
import './seegenres.css'


export default function SeeGenres(){
    const [firstRender, setFirstRender] = useState(true)
    const dispatch = useDispatch()
    
    const genres = useSelector(state => state.allGenres)
    const loading = useSelector(state => state.loader)

    useEffect(()=>{
        dispatch(loader(true))
        dispatch(getAllGenres())
        setFirstRender(false)
    },[])
    useEffect(()=>{
        if (firstRender) return                
        genres.length && dispatch(loader(false))
    },[genres])
    return (
        <div className="seegenres">
            <h1 className="cards-title">Genres</h1>
            <div className="cards-container">
                {loading? 
                    <div className="loader-cont">
                        <Loader/>
                    </div>
                    :
                    genres && genres.map(genre => (
                        <div key={genre.id}>
                            <Card 
                                title={genre.name}
                                infoTitle={'Example games'} 
                                info={genre.games} 
                                image={genre.image} 
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}