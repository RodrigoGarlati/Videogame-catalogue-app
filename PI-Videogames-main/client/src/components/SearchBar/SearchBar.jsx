import React, { Component } from "react";
import { connect } from 'react-redux';
import { searchGames, getAllGames, getPreGames, getCreatedGames, orderGames } from "../../redux/actions";

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
        <div>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>By name: </label>
                <input placeholder="Name.." name="name" onChange={e => this.handleChange(e)}></input>
                <label>By genre: </label>
                <input placeholder="Genre.." name="genre"></input>
                <button type="submit">Buscar</button>
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