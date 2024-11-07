import React, { Component } from "react";
import { connect } from 'react-redux';
import { searchGames, loader } from "../../redux/actions";
import './searchbar.css'

export class SearchBar extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            name: '',
        }
    }

    handleChange(e){
        this.setState({name: e.target.value}) 
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.loader(true)
        this.props.searchGames(this.props.page, this.state.name)
    }



    render(){
        return (
        <div className="searchbar">
            <form onSubmit={e => this.handleSubmit(e)} className='searchform'>
                <label className="searchlabel">Search game </label>
                <div className="input-button">
                    <input className="searchinput" placeholder="Name.." name="name" autoComplete="off" onChange={e => this.handleChange(e)}></input>
                    <button className="searchbutton" type="submit">Search</button>
                </div>
            </form>
        </div>
    )}
}


export function mapDispatchToProps(dispatch){
    return {
        searchGames: ((page, game) => dispatch(searchGames(page, game))),
        loader: ((value) => dispatch(loader(value)))
    }

}

export default connect(null, mapDispatchToProps)(SearchBar)