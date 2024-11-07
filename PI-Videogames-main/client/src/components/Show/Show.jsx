import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllGames, getCreatedGames, getPreGames, loader } from "../../redux/actions";
import DropdownComponent from "../common/DropdownComponent/DropdownComponent";

export class Show extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: 'All'
        }
    }

    componentDidMount(){
        this.props.loader(true)
        this.props.getAllGames(this.props.page)
    }

    componentDidUpdate(){
        this.props.loader(true)
        if (this.state.show == 'All') {
            this.props.getAllGames(this.props.page)
        }
        else if (this.state.show == 'Preexisting'){
            this.props.getPreGames(this.props.page)
        }
        else if (this.state.show == 'Created'){
            this.props.getCreatedGames(this.props.page)
        }
    }

    render(){
        return(
            <div className="show">
                <DropdownComponent
                    title={'Show'}
                    options={['All', 'Preexisting', 'Created']}
                    onSelect={(title, selected) => this.setState({show: selected})}
                />
            </div>
        )}
}

export function mapDispatchToProps(dispatch){
    return{
        getAllGames: ((page)=> dispatch(getAllGames(page))),
        getPreGames: ((page)=> dispatch(getPreGames(page))),
        getCreatedGames: ((page)=> dispatch(getCreatedGames(page))),
        loader: ((value) => dispatch(loader(value)))
    }
}

export default connect(null , mapDispatchToProps)(Show)