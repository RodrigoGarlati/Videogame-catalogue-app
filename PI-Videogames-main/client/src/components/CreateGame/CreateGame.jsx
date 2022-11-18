import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createGame } from "../../redux/actions";
import GameCard from '../GameCard/GameCard'

export default function CreateGame(){
    const [input, setInput] = useState({
        id: 0,
        name: '',
        description: '',
        platforms: '',
        releaseDate: '',
        rating: 0,
        image: '',
        genre: ''
    });

    const created = useSelector(state => state.createdGames)
    const last = created.length-1 

    const [change, setChange] = useState(false)

    useEffect(()=>{
        setChange(true)
    }, [created])

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createGame(input))
    };

    
    return (
        <div>
            <h2>Create new game: </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder="Name.." name="name" onChange={(e) => changeHandler(e)}></input>
                <input placeholder="ID.." type='number' name="id" onChange={(e) => changeHandler(e)}/>
                <input placeholder="Description.." name="description" onChange={(e) => changeHandler(e)}></input>
                <input placeholder="platforms" name="platforms" onChange={(e) => changeHandler(e)}></input>
                <label>Released at: </label>
                <input type="date" name="relDate" onChange={(e) => changeHandler(e)}/>
                <input type="number"  placeholder="Rating.." name="rating" onChange={(e) => changeHandler(e)}/>
                <input type="text" placeholder='Image url..' name="image" onChange={(e) => changeHandler(e)} />
                <input placeholder="Genre" name='genre' onChange={(e) => changeHandler(e)} ></input>
                <button type="submit"> CREATE </button>
            </form>

            <div>
                {change && created[last]? (
                    <div>
                        <h2>The game has been created succesfuly!</h2>
                        <Link to={`/gamedetail/${created[last].id}`}>
                            <GameCard name={created[last].name} image={created[last].image} genres={created[last].genre} />
                        </Link>
                    </div>
                )
                : null }
            </div>
        </div>
    );
}