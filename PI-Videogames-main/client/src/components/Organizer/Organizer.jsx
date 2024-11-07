import React, { Component } from "react";
import { connect } from "react-redux";
import { loader, orderGames } from "../../redux/actions";
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
        this.props.loader(true)
        let {order, orderBy} = this.state
        let params = {order, orderBy}
        this.props.orderGames(params)
    }

    handleSelect(title, value){
        if (value == 'Any'){
            this.setState({
                order: ''
            })
        }
        else this.setState({[title]: value})
    }


    render(){
        return(
            <div className="organizer">
                <DropdownComponent
                    title={'In order'}
                    options={['Any', 'Ascending', 'Descending']}
                    onSelect={(title, value) => this.handleSelect('order', value)}
                />
                <DropdownComponent
                    title={'Order by'}
                    options={['Alphabetical', 'Rating']}
                    onSelect={(title, value) => this.handleSelect('orderBy', value)}
                />
            </div>
        )    
    }
}

export function mapDispatchToProps(dispatch){
    return{
        orderGames: (params => dispatch(orderGames(params))),
        loader: (value => dispatch(loader(value)))
    }
}

export default connect (null, mapDispatchToProps)(Organizer)