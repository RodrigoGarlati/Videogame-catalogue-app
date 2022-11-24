import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGames, getAllGenres } from "../../redux/actions";
import './filter.css'

export class Filter extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getAllGenres()
    }

    handleFilter(e){
        let select = e.target
        let value = select.options[select.selectedIndex].text
        this.props.filterGames(value)
    }

    render(){
        return(
            <div className="filter">
                <label className="filterlabel" htmlFor="genre">Genre </label>
                <select className="filterselect" name="genre" id="genre" onChange={e => this.handleFilter(e)}>
                    <option>Any</option>
                    {this.props.genres.map(genre => (
                        <option>{genre.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch){
    return{
        getAllGenres: (() => dispatch(getAllGenres())),
        filterGames: (filter => dispatch(filterGames(filter)))
    }
}

export function mapStateToProps(state){
    return {
        genres: state.allGenres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)