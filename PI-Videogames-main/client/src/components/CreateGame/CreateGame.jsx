import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createGame, getAllGenres } from "../../redux/actions";
import Card from '../common/Card/Card';
import { v4 as uuidv4 } from 'uuid';
import InputComponent from "../common/InputComponent/InputComponent";
import TextFieldComponent from "../common/TextFieldComponent/TextFieldComponent";
import DropdownComponent from "../common/DropdownComponent/DropdownComponent";
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
        genres: [],
        created: false
    });

    const [errors, setErrors] = useState({})

    const genres = useSelector(state => state.allGenres)
    const created = useSelector(state => state.createdGame) 

    const dispatch = useDispatch()

    const platforms = ['PC', 'Playstation 3', 'Playstation 4', 'Playstation 5',
    'Xbox 360', 'Xbox One', 'Xbox series X/S', 'Linux', 'Nintendo Switch', 'Nintendo Nes', 'Web']
    
    useEffect(()=>{
        dispatch(getAllGenres())
    }, [])

    useEffect(()=>{
        setInput({
            ...input,
            created: true
        })
    },[created])

    const validate = () => {
        let newErrors = {}
        const errorMsg = '* We need a value for'
        const requiredInputFields = ['name', 'platforms', 'description', 'genres', 'rating']
        for (let requiredField of requiredInputFields){
            if(!input[requiredField] || !input[requiredField].length){
                newErrors[requiredField] = errorMsg + ' ' + requiredField
            }
        }
        let totalErrors = errors
        if (Object.keys(newErrors).length){
            totalErrors = {...errors, ...newErrors}
            setErrors(totalErrors)
        }
        return Object.keys(totalErrors).length ? true : false
    }

    const cleanErrorField = (field) => {
        setErrors({
            ...errors,
            [field]: null
        })
    }

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        cleanErrorField(e.target.name)
    }

    const onDropSelect = (title, options) => {
        const titleLowerCase = title.toLowerCase()
        setInput((prevInput) => {
            return {
                ...prevInput,
                [titleLowerCase]: options
            }
        })
        cleanErrorField(titleLowerCase)
    }

    function handleSubmit(e){
        e.preventDefault();
        const hasErrors = validate()
        if (hasErrors) return
        dispatch(createGame(input))
    };
    
    return (
        <div className="creategame">
            <h1 className="createtitle">Create new game: </h1>
            <div className="omgcont">
                <form className="createform" onSubmit={(e) => handleSubmit(e)}>
                    <InputComponent
                        label={'Name'}
                        value={input.name}
                        name={'name'}
                        placeholder={'Name..'}
                        onChange={changeHandler}
                        error={errors.name}
                    />
                    <TextFieldComponent
                            label={'Description'}
                            value={input.description}
                            placeholder={'Description..'}
                            name={'description'}
                            onChange={changeHandler}
                            error={errors.description}
                    />
                    <div className="inputs-container">
                        <DropdownComponent
                            title={'Platforms'}
                            options={platforms}
                            onSelect={onDropSelect}
                            multiSelect={true}
                            error={errors.platforms}
                        />
                        <DropdownComponent
                            title={'Genres'}
                            options={genres.map(genre => genre.name)}
                            onSelect={onDropSelect}
                            multiSelect={true}
                            error={errors.genre}
                        />
                    </div>
                    <div className="inputs-container">  
                        <InputComponent
                            label={'Released at'}
                            value={input.releaseDate}
                            name={'releaseDate'}
                            type={'date'}
                            placeholder={'Release date'}
                            onChange={changeHandler}
                        />
                        <InputComponent
                            label={'Rating'}
                            value={input.rating}
                            type={'number'}
                            placeholder={'Rating..'}
                            name={'rating'}
                            onChange={changeHandler}
                            error={errors.rating}
                        />
                        <InputComponent
                            label={'Image url'}
                            value={input.image}
                            type={'text'}
                            placeholder={'Image url..'}
                            name={'image'}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="buttoncreatediv">
                        <button className="buttoncreate" type="submit" disabled={errors.disable? true : false} > CREATE </button>
                    </div>
                </form>
                <div className="createcardcont">
                    {Object.keys(created).length?
                    <div className="preview">
                        <h2 className="previewtitle">Your game has been created succesfuly!</h2>
                        <Link to={`/gamedetail/${created.id}`}>
                            <Card name={created.name} image={created.image} genres={created.genre}/>
                        </Link>
                    </div> 
                    :
                    <div className="preview">
                        <h2 className="previewtitle">Your game:</h2>
                        <Card 
                            title={input.name}
                            image={input.image}
                            infoTitle={'Genres'}
                            info={input.genres.join(', ')}
                        /> 
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}