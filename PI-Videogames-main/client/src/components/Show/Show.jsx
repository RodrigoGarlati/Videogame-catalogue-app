import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllGames, getCreatedGames, getPreGames } from "../../redux/actions";

export class Show extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: 'All'
        }
    }

    componentDidMount(){
        this.props.getAllGames()
    }

    componentDidUpdate(){
        if (this.state.show == 'All') this.props.getAllGames()
        else if (this.state.show == 'Preexisting') this.props.getPreGames()
        else if (this.state.show == 'Created') this.props.getCreatedGames()
    }

    handleShow(e){
        let select = e.target
        let value = select.options[select.selectedIndex].text
        this.setState({[select.name]: value})
    }

    render(){
        return(
            <div>
                <select  name="show"  onChange={e => this.handleShow(e)} >
                    <option>All</option>
                    <option>Preexisting</option>
                    <option>Created</option>
                </select>
            </div>
        )}
}

export function mapDispatchToProps(dispatch){
    return{
        getAllGames: (()=> dispatch(getAllGames())),
        getPreGames: (()=> dispatch(getPreGames())),
        getCreatedGames: (()=> dispatch(getCreatedGames()))
    }
}

export default connect(null , mapDispatchToProps)(Show)