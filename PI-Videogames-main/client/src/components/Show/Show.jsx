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
        this.props.getAllGames(this.props.page)
    }

    componentDidUpdate(){
        if (this.state.show == 'All') {
            this.props.loader()
            this.props.getAllGames(this.props.page)
        }
        else if (this.state.show == 'Preexisting'){
            this.props.loader()
            this.props.getPreGames(this.props.page)
        }
        else if (this.state.show == 'Created'){
            this.props.loader()
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
        loader: (() => dispatch(loader()))
    }
}

export default connect(null , mapDispatchToProps)(Show)