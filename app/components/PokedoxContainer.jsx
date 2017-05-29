import React, {Component} from 'react';
import {render} from 'react-dom';
import UserActions from '../actions/UserActions';

export default class PokedoxContainer extends Component {

	constructor(props) {
        super(props);
    }

    componentWillMount () {
    	//Initiating a call back to fetch pokemon data
    	UserActions.fetchPokedox();
    }

	render (){
		return (
			<div id="pokedox-container">
				Container goes here ....
			</div>
		);
	}
}