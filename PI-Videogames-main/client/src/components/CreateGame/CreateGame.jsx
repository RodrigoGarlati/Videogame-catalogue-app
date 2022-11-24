import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createGame, getAllGenres } from "../../redux/actions";
import GameCard from '../GameCard/GameCard';
import { v4 as uuidv4 } from 'uuid';
import NavBar from '../NavBar/NavBar'
import './creategame.css'

export default function CreateGame(){
    const [input, setInput] = useState({
        id: uuidv4(),
        name: '',
        description: '',
        platforms: [],
        releaseDate: '',
        rating: 0,
        image: '',
        genre: [],
        created: false
    });

    const [errors, setErrors] = useState({
        disable: true
    })
    

    const genres = useSelector(state => state.allGenres)
    const created = useSelector(state => state.createdGame) 

    const dispatch = useDispatch()

    const platforms = ['PC', 'Playstation 3', 'Playstation 4', 'Playstation 5',
    'Xbox 360', 'Xbox One', 'Xbox series X/S', 'Linux', 'Nintendo Switch', 'Nintendo Nes', 'Web']
    
    useEffect(()=>{
        dispatch(getAllGenres())
    }, [])

    useEffect(()=>{
        setErrors(validate(input))
        console.log(input.id)
    },[input])

    useEffect(()=>{
        setInput({
            ...input,
            created: true
        })
    },[created])

    function validate(input){
        let errors = {}
        if (!input.name){
            errors.name = '* (We need a name)'
            errors.disable = true
        }
        if (!input.platforms.length){
            errors.platforms = '* (We need at least one platform to add)'
            errors.disable = true
        }
        if(!input.description){
            errors.description = '* (We need a description)'
            errors.disable = true
        }
        if(!input.genre.length){
            errors.genre = '* (We need at least one genre for the game)'
            errors.disable = true
        }
        if(input.rating > 5 || input.rating < 0){
            errors.rating = '*(Must be between 0 and 5)'
            errors.disable = true
        }

        if (!errors.name && !errors.description && !errors.platforms && !errors.genre && !errors.rating){
            setErrors({
                disable: false
            })
        }
        console.log(errors)
        return errors
    }

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createGame(input))
    };

    function handleCheck(e){
        if (!input[e.target.name].includes(e.target.value)){
            setInput((prevInput) => {
                return {
                    ...prevInput,
                    [e.target.name]: [...prevInput[e.target.name], e.target.value]
                }
            })
        }
        else{
            let index = input[e.target.name].indexOf(e.target.value)
            let plat = input[e.target.name]
            plat.splice(index, 1)
            setInput({
                ...input,
                [e.target.name]: plat
            })
        }
        console.log(input)
    }

    

    return (
        <div className="creategame">
            <NavBar/>
            <h1 className="createtitle">Create new game: </h1>
            <div className="omgcont">
                <form className="createform" onSubmit={(e) => handleSubmit(e)}>
                    <div className="namedescription">
                        <div className="inputandlabel">
                            <label className="createlabel">Name</label>
                            <input className="createinput" autoComplete="off" placeholder="Name.." name="name" value={input.name} 
                            onChange={(e) => changeHandler(e)}></input>
                            {errors.name && 
                            <p className="errorsP">{errors.name}</p>}
                        </div>
                        
                        <div className="inputandlabel">
                            <label className="createlabel">Description</label>
                            <input  placeholder="Description.." autoComplete="off" className="createinput" name="description" value={input.description} 
                            onChange={(e) => changeHandler(e)}></input>
                            {errors.description && 
                            <p className="errorsP">{errors.description}</p>}
                        </div>
                    </div>
                    <br/>
                    
                    <label className="createlabel">Platforms</label>
                    
                    <div className='platforms' >
                        {platforms.map(plat => (
                            <div className="platformDiv">
                                <label className="checklabel" htmlFor={plat}><input className="createcheckbox" type='checkbox' 
                                name="platforms" id={plat} value={plat} onChange={e => handleCheck(e)}/>{plat}</label>
                            </div>
                        ))}
                    </div>
                    {errors.platforms && 
                    <p className="errorsP">{errors.platforms}</p>}
                    
                    <div className="inputscontainer">  
                        <div className="inputandlabel">
                            <label className="createlabel">Released at</label>
                            <input className="createinput" type="date" name="releaseDate" value={input.releaseDate} onChange={(e) => changeHandler(e)}/>
                        </div>
                        <div className="inputandlabel">
                            <label className="createlabel">Rating</label>
                            <input className="createinput" autoComplete="off" type="number" placeholder="Rating.."
                            name="rating" value={input.rating} onChange={(e) => changeHandler(e)}/>
                            {errors.rating && 
                            <p className="errorsP">{errors.rating}</p>}
                        </div>
                        <div className="inputandlabel">
                            <label className="createlabel">Image url</label>
                            <input className="createinput" autoComplete="off" type="text" placeholder='Image url..' name="image" value={input.image} onChange={(e) => changeHandler(e)} />
                        </div>
                    </div>
                    
                    <br/>
                    
                    <label className="createlabel">Genres</label>
                    
                    <div className="genres">
                        {genres.map(genre => (
                            <div className="genresdiv">
                                <label className="checklabel" htmlFor={genre.id}><input type='checkbox' 
                                name="genre" id={genre.id} value={genre.name} onChange={e => handleCheck(e)} />{genre.name}</label>
                            </div>
                        ))}
                    </div>
                    {errors.genre && 
                    <p className="errorsP">{errors.genre}</p>}
                    
                    <div className="buttoncreatediv">
                        <button className="buttoncreate" type="submit" disabled={errors.disable? true : false} > CREATE </button>
                    </div>
                </form>
                <div className="createcardcont">
                    {Object.keys(created).length?
                    <div className="preview">
                        <h2 className="previewtitle">Your game has been created succesfuly!</h2>
                        <Link to={`/gamedetail/${created.id}`}>
                            <GameCard name={created.name} image={created.image} genres={created.genre}/>
                        </Link>
                    </div> 
                    :
                    <div className="preview">
                        <h2 className="previewtitle">Your game:</h2>
                        <GameCard name={input.name}  image={input.image} genres={input.genre.toString()} /> 
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}