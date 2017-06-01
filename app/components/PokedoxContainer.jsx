'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import {fetchPokemonData} from '../actions/PokedexActions';
import PokedexStore from '../store/PokedexStore';
import AppConstants from '../constant/Constants';
import PokemonCards from './PokemonCards.jsx';
import Loader from './Loader.jsx';

const {
	ACTIONS_CONSTANT,
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

export default class PokedoxContainer extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	data: []
        }
    }

    componentWillMount () {
    	//Initiating a call back to fetch pokemon data
    	fetchPokemonData();
    }

    componentDidMount () {
    	PokedexStore.addChangeListner(EVENT_CONSTANT.DATA_LOADED, this.renderData);
    }

    componentWillUnMount () {
    	PokedexStore.removeChangeListner(EVENT_CONSTANT.DATA_LOADED, this.renderData);
    }

    /** @param: An array of objects 
      *	
      * description : Function to receive data from the store & update state
      * 
      **/
    renderData = (data) => {
    	console.log("Container : Received data .. : data : ", data);
    	this.setState({ data:  data});
    }
 
	render () {

		return (
			<div id="pokedox-container">
				{/*<CustomSearchPanel/>*/}
				{ this.state.data.length ? <PokemonCards data={this.state.data}/> : <Loader/> }
				{/*<Pagination/>*/}
			</div>
		);
	}
}