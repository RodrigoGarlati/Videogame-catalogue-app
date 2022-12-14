import React, { Component } from "react";
import { connect } from 'react-redux';
import { searchGames } from "../../redux/actions";
import './searchbar.css'

export class SearchBar extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            name: '',
            show: 'All',
            order: '',
            orderBy: 'Alphabetical',
        }
    }





    handleChange(e){
        this.setState({name: e.target.value}) 
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.searchGames(this.state.name)
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
        searchGames: (game => dispatch(searchGames(game))),
    }

}

export default connect(null, mapDispatchToProps)(SearchBar)