import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGames, getAllGenres } from "../../redux/actions";
import DropdownComponent from "../common/DropdownComponent/DropdownComponent";

export class Filter extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getAllGenres()
    }

    handleFilter(genre){
        this.props.filterGames(genre)
    }

    render(){
        return(
            <div className="filter">
                <DropdownComponent
                    title={'Genre'}
                    options={this.props.genres.map(genre => genre.name)}
                    onSelect={(title, selected) => this.handleFilter(selected)}
                />
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