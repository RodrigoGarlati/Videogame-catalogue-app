import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGenre } from "../../redux/actions";
import  GenreCard  from '../GenreCard/GenreCard.jsx'

export default function CreateGenre(){
    const [input, setInput] = useState({
        name: '',
        id: 0,
        image: '',
        games: '',
        change: false
    })

    const created = useSelector(state => state.createdGenres)
    const last = created[created.length-1]

    useEffect(()=>{
        setInput({change: true})
    },[created])

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    console.log(created[created.length-1])

    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createGenre(input))
    }

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="name" placeholder="Name..." onChange={e => changeHandler(e)}/>
                <input type="number" name="id" placeholder="id..." onChange={e => changeHandler(e)}/>
                <input type="text" name="image" placeholder="Image url..." onChange={e => changeHandler(e)}/>
                <input type="text" name="games" placeholder="Example games..." onChange={e => changeHandler(e)} />
                <button type="submit"> CREATE </button>
            </form>
            {input.change == true && created[created.length-1]? (
                <div>
                    <h2>The genre has been created succesfuly!</h2>
                    <GenreCard name={created[last].name} image={created[last].image} games={created[last].games} /> 
                </div>
            )
            : null}

        </div>
    )
}