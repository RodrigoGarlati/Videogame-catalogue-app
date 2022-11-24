import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGenre } from "../../redux/actions";
import GenreCard from "../GenreCard/GenreCard"
import { v4 as uuidv4 } from 'uuid';
import NavBar from '../NavBar/NavBar'
import './creategenre.css'

export default function CreateGenre(){
    const [input, setInput] = useState({
        name: '',
        id: uuidv4(),
        image: '',
        games: '',
        change: false
    })

    const [errors, setErrors] = useState({
        disable: true
    })

    const created = useSelector(state => state.createdGenre)

    useEffect(()=>{
        setErrors(validate(input))
        console.log(input.id)
    }, [input])

    function validate(input){
        let errors = {}

        if (!input.name){
            errors.name = '* (We need a genre name)'
        }

        if (!errors.name){
            errors.disable = false
        }
        
        return errors
    }

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createGenre(input))
    }

    return(
        <div className="creategenre">
            <NavBar/>
            <h1 className="gcreatetitle">CREATE GENRE</h1>
            <div className="gcreateallcont">
                <form className="creategenreform" onSubmit={e => handleSubmit(e)}>
                    <div className="gcreatediv">
                        <label className="createlabel">Name</label>
                        <input className="createinput" autoComplete="off" type="text" name="name" placeholder="Name..." onChange={e => changeHandler(e)}/>
                        {errors.name && 
                        <p className="errors">{errors.name}</p>}
                    </div>
                    <br/>
                    <div className="gcreatediv">
                        <label className="createlabel">Image url</label>
                        <input className="createinput" autoComplete="off" type="text" name="image" placeholder="Image url..." onChange={e => changeHandler(e)}/>
                    </div>
                    <br/>
                    <div className="gcreatediv">
                        <label className="createlabel">Example games</label>
                        <input className="createinput" autoComplete="off" type="text" name="games" placeholder="Example games..." onChange={e => changeHandler(e)} />
                    </div>
                    <br/>
                    <button className="buttoncreate" type="submit"> CREATE </button>
                </form>
                {Object.keys(created).length > 0?
                    <div className="statusdiv">
                        <h3 className="gstatus">Your genre has been created succesfuly!</h3>  
                        <GenreCard name={created.name} image={created.image} games={created.games} />
                    </div>
                    : null
                }
            </div>
        </div>
    )
}