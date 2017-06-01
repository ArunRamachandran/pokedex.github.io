'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import {fetchPokemonData} from '../actions/PokedexActions';
import PokedexStore from '../store/PokedexStore';
import AppConstants from '../constant/Constants';
import PokemonCards from './PokemonCards.jsx';
import Loader from './Loader.jsx';
import Pagination from './Pagination.jsx';
import { Snackbar } from 'react-mdl';


const {
	ACTIONS_CONSTANT,
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

export default class PokedoxContainer extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	data: [],
        	currentPage: 1,
        	cardsPerPage: 10,
        	isSnackbarActive: false,
        	warningMsg: ''
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

    /** description: Function to load previous page according to the users choice **/
    loadPreviousPage = () => {
    	let currentPage = this.state.currentPage;
    	currentPage > 1 ? 
    		this.setState({currentPage: currentPage - 1}) : 
    		this.setState({isSnackbarActive: true, warningMsg: 'You are already in the first page'});
    }

    /** description: Function to load next page & next set of pokemons from the dataset 
      *			This function will be invoked according to the user action / by clicking
      *			on the next button provided in the pagination component.
      **/
    loadNextPage = () => {
    	let { data, currentPage } = this.state;
    	currentPage < data.length ? 
    		this.setState({currentPage: currentPage + 1}) :
    		this.setState({isSnackbarActive: true, warningMsg: 'You are already in the last page'});
    }

    closeSnackbar = () => {
    	this.setState({
    		isSnackbarActive: false,
    		warningMsg: ''
    	});
    }

 
	render () {

		const {data, currentPage, cardsPerPage} = this.state;

		// Logic for current page contents
		const indexOfLastCard = currentPage * cardsPerPage;
		const indexOfFirstCard = indexOfLastCard - cardsPerPage;
		const currentData = data.slice(indexOfFirstCard, indexOfLastCard);

		return (
			<div id="pokedox-container">
				{/*<CustomSearchPanel/>*/}
				{ this.state.data.length ? <PokemonCards data={currentData}/> : <Loader/> }
				{ this.state.data.length ? 
					<Pagination 
						pageNumber={currentPage}
						loadPreviousPage={this.loadPreviousPage}
						loadNextPage={this.loadNextPage}/> 
					: <noscript/> 
				}
				{ this.state.isSnackbarActive &&
					<Snackbar
			          active={this.state.isSnackbarActive}
			          onClick={this.closeSnackbar}
			          onTimeout={this.closeSnackbar}
			          action="Close">
			          	{this.state.warningMsg}
			         </Snackbar>
				}
			</div>
		);
	}
}