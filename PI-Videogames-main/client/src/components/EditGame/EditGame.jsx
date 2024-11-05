import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { editGames } from "../../redux/actions";
import DropdownComponent from "../common/DropdownComponent/DropdownComponent"
import InputComponent from "../common/InputComponent/InputComponent"
import TextFieldComponent from "../common/TextFieldComponent/TextFieldComponent"
import './editgame.css'

export class EditGame extends Component{
    constructor(props){
        super(props)
        this.state = {
            newValues: {
                'Name': '',
                'Description': '',
                'Release date': '',
                'Rating': '',
                'Platforms': '',
                'Genres': '',
                'Image': ''
            },
            selectedInputs: [],
            amountSelectedValues: 0
        }
        this.id = this.props.match.params.id
        this.gameName = this.props.match.params.name
    }

    handleNewValue(e){
        let newValues = {...this.state.newValues}
        newValues[e.target.name] = e.target.value
        this.setState({
            newValues: newValues
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.editGame(this.id, this.state.newValues)
    }
    
    handleDropSelection = (title, values) => {
        this.setState({
            selectedInputs: values
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (JSON.stringify(prevState.newValues) !== JSON.stringify(this.state.newValues)){
            this.setState({
                amountSelectedValues: Object.values(this.state.newValues).filter(value => value !== '').length
            })
        }
    }

    render(){
        return(
            <div className="edit-game">
                <h1 className="cards-title">Edit your game:</h1>
                <h1 className="edit-game-name">{this.gameName}</h1>
                {this.props.edited? <Link to={`/gamedetail/${this.id}`}><p className="request-status">{this.props.edited}</p></Link> : null}
                <form className="edit-form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="edit-select-cont">
                        <p className="edit-subtitle">Select fields to edit</p>
                        <DropdownComponent
                            title={'Data to edit'}
                            options={Object.keys(this.state.newValues)}
                            onSelect={this.handleDropSelection}
                            multiSelect={true}
                        />
                    </div>
                    <div className="new-fields-cont">
                        <p className="edit-subtitle">The new info:</p>
                        <div className="new-fields">
                            {this.state.selectedInputs.length? this.state.selectedInputs.map(item => (
                                item !== 'Description' ?
                                    <div className="toeditcont">
                                        <InputComponent
                                            label={item}
                                            name={item}
                                            placeholder={item}
                                            onChange={this.handleNewValue.bind(this)}
                                            type={item == 'Release date' ? 'date' : item == 'Rating' ? 'number' : 'string'}
                                        />
                                    </div>
                                    :
                                    <div className="text-field-cont">
                                        <TextFieldComponent
                                            label={item}
                                            name={item}
                                            placeholder={item}
                                            onChange={this.handleNewValue.bind(this)}
                                        />
                                    </div>
                            )): null}
                        </div>
                    </div>
                    <button 
                        className="sendeditbutton" 
                        type="submit" 
                        disabled={!this.state.selectedInputs.length || !this.state.amountSelectedValues || this.state.selectedInputs.length !== this.state.amountSelectedValues}
                    >
                        EDIT
                    </button>
                </form>
            </div>
        )
    }
}

export function mapStateToProps(state){
    return{
        edited: state.editGame
    }
}

export function mapDispatchToProps(dispatch){
    return{
        editGame: ((id, newValues)=> dispatch(editGames(id, newValues)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGame)