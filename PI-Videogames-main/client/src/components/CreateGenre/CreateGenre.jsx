import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGenre, loader } from "../../redux/actions";
import Card from "../common/Card/Card";
import { v4 as uuidv4 } from 'uuid';
import InputComponent from "../common/InputComponent/InputComponent";
import TextFieldComponent from "../common/TextFieldComponent/TextFieldComponent";
import './creategenre.css'
import Loader from "../Loader/Loader";

export default function CreateGenre(){
    const [input, setInput] = useState({
        name: '',
        id: uuidv4(),
        image: '',
        games: '',
        change: false
    })

    const [errors, setErrors] = useState(null)

    const created = useSelector(state => state.createdGenre)
    const loading = useSelector(state => state.loader)

    function validate(input){
        let errors = {}
        if (!input.name){
            errors.name = '* (We need a genre name)'
        }
        return errors
    }

    function changeHandler(e){
        const newInput = {
            ...input,
            [e.target.name]: e.target.value
        } 
        setInput(newInput)
        setErrors(validate(newInput))
    }

    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault();
        dispatch(loader(true))
        dispatch(createGenre(input))
    }

    return(
        <div className="create-genre">
            {loading &&
                <div className="loader-cont"> 
                    <Loader/>
                </div>
            }
            <h1 className="gcreatetitle">CREATE GENRE</h1>
                {Object.keys(created).length > 0?
                    <div className="statusdiv">
                        <h3 className="request-status">Your genre has been created succesfuly!</h3>  
                        <Card 
                            title={created.name}
                            infoTitle="Example games"
                            info={created.games}
                            image={created.image}
                        />
                    </div>
                    : null
                }
                <form className="creategenreform" onSubmit={e => handleSubmit(e)}>
                    <InputComponent
                        label={'Name'}
                        name={'name'}
                        value={input.name}
                        placeholder={'Name..'}
                        onChange={changeHandler}
                        error={errors?.name}
                    />
                    <InputComponent
                        label={'Image'}
                        name={'image'}
                        value={input.image}
                        placeholder={'Image url..'}
                        onChange={changeHandler}
                    />
                    <TextFieldComponent
                        label={'Example games'}
                        name={'games'}
                        value={input.games}
                        placeholder={'Example games..'}
                        onChange={changeHandler}
                    />
                    <button className="buttoncreate" type="submit" disabled={!input.name || !!errors?.name}> CREATE </button>
                </form>
        </div>
    )
}