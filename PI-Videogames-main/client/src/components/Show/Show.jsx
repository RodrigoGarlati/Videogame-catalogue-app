import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllGames, getCreatedGames, getPreGames, loader } from "../../redux/actions";
import './show.css'

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
        if (this.state.show == 'All') {
            this.props.loader()
            this.props.getAllGames()
        }
        else if (this.state.show == 'Preexisting'){
            this.props.loader()
            this.props.getPreGames()
        }
        else if (this.state.show == 'Created') this.props.getCreatedGames()
    }

    handleShow(e){
        let select = e.target
        let value = select.options[select.selectedIndex].text
        this.setState({[select.name]: value})
    }

    render(){
        return(
            <div className="show">
                <label className="showlabel" htmlFor="show">Show </label>
                <select className="showselect" id="show" name="show" onChange={e => this.handleShow(e)} >
                    <option className="showoption">All</option>
                    <option className="showoption">Preexisting</option>
                    <option className="showoption">Created</option>
                </select>
            </div>
        )}
}

export function mapDispatchToProps(dispatch){
    return{
        getAllGames: (()=> dispatch(getAllGames())),
        getPreGames: (()=> dispatch(getPreGames())),
        getCreatedGames: (()=> dispatch(getCreatedGames())),
        loader: (() => dispatch(loader()))
    }
}

export default connect(null , mapDispatchToProps)(Show)