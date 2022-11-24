import React, { Component } from "react";
import { connect } from "react-redux";
import { orderGames } from "../../redux/actions";
import './organizer.css'

export class Organizer extends Component{
    constructor(props){
        super(props)
        this.state = {
            order: '',
            orderBy: 'Alphabetical'
        }
    }

    componentDidUpdate(){
        let {order, orderBy} = this.state
        let params = {order, orderBy}
        this.props.orderGames(params)
        
    }

    handleSelect(e){
        let select = e.target
        let value = select.options[select.selectedIndex].text
        if (value == 'Any'){
            this.setState({
                order: ''
            })
        }
        else this.setState({[select.name]: value})
    }


    render(){
        return(
            <div className="organizer">
                <label className="organizerlabel">In order </label>
                <select className="organizerselect" name="order" onChange={e => this.handleSelect(e)}>
                    <option>Any</option>
                    <option>Upward</option>
                    <option>Falling</option>
                </select>
                <label className="organizerlabel">Order by </label>
                <select className="organizerselect" name="orderBy" onChange={e => this.handleSelect(e)}>
                    <option>Alphabetical</option>
                    <option>Rating</option>
                </select>
            </div>
        )    
    }
}

export function mapStateToProps(state){
    return{
        allGames: state.allGames,
        preGames: state.preGames,
        createdGames: state.createdGames
    }
}

export function mapDispatchToProps(dispatch){
    return{
        orderGames: (params => dispatch(orderGames(params)))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Organizer)