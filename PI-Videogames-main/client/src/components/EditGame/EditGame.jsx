import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { editGames } from "../../redux/actions";
import NavBar from '../NavBar/NavBar'
import './editgame.css'

export class EditGame extends Component{
    constructor(props){
        super(props)
        this.state = {
            toChange: [],
            newValues: []
        }
        this.id = this.props.match.params.id
    }

    handleToChange(e){
        if (this.state.toChange.includes(e.target.name)){
            let index = this.state.toChange.indexOf(e.target.name)
            let newArr = this.state.toChange
            newArr.splice(index, 1)
            this.setState({
                ...this.state,
                toChange: newArr 
            })
        }
        else{
            this.setState({
                ...this.state,
                toChange: [...this.state.toChange, e.target.name]
            })
        }
    }

    handleNewValue(e){
        let index = this.state.toChange.indexOf(e.target.name)
        let newArr = [...this.state.newValues]
        newArr[index] = e.target.value
        this.setState({
            ...this.state,
            newValues: newArr
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.editGame(this.id, this.state.toChange, this.state.newValues)
    }

    render(){
        return(
            <div className="editgame">
                <NavBar/>
                <h1 className="edittitle">Edit your game</h1>
                {this.props.edited? <Link to={`/gamedetail/${this.id}`}><p className="status">{this.props.edited}</p></Link> : null}
                <form className="editform" onSubmit={e => this.handleSubmit(e)}>
                    <div className="editselectcont">
                        <p className="editsubtitle">Select the atributtes to edit:</p>
                        <div>
                            <label className="editlabel" htmlFor="name"><input  type="checkbox" 
                            name="name" id="name" onChange={e => this.handleToChange(e)}/> Name </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="description"><input  type="checkbox" 
                            name="description" id="description" onChange={e => this.handleToChange(e)}/> Description </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="release"> <input  type="checkbox" 
                            name="releaseDate" id="release" onChange={e => this.handleToChange(e)}/> Release Date </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="rating"><input  type="checkbox" 
                            name="rating" id="rating" onChange={e => this.handleToChange(e)}/> Rating </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="platforms"><input type="checkbox" 
                            name="platforms" id="platforms" onChange={e => this.handleToChange(e)}/> Platforms </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="image"><input  type="checkbox" 
                            name="image" id="image" onChange={e => this.handleToChange(e)}/> Image </label>
                        </div>
                        <div>
                            <label className="editlabel" htmlFor="genre"><input  type="checkbox" 
                            name="genre" id="genre" onChange={e => this.handleToChange(e)}/> Genres </label>
                        </div>
                        <br/>
                    </div>
                    
                    <button className="sendeditbutton" type="submit">EDIT</button>
                    
                    <div className="editselectcont2">
                        <p className="editsubtitle">The new info:</p>
                        {this.state.toChange.length? this.state.toChange.map(item => (
                            <div className="toeditcont">                                
                                <input className="editinput" autoComplete="off" type="text" placeholder={item} name={item} onChange={e => this.handleNewValue(e)} />
                            </div>
                        )): null}
                    </div>
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
        editGame: ((id, toChange, newValues)=> dispatch(editGames(id, toChange, newValues)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGame)