import React, { Component } from "react";
import { connect } from "react-redux";
import { orderGames } from "../../redux/actions";
import DropdownComponent from "../common/DropdownComponent/DropdownComponent";
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
                <DropdownComponent
                    title={'In order'}
                    options={['Any', 'Ascending', 'Descending']}
                />
                <DropdownComponent
                    title={'Order by'}
                    options={['Alphabetical', 'Rating']}
                />
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