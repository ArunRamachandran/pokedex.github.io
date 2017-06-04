'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import {fetchPokemonData} from '../actions/PokedexActions';
import PokedexStore from '../store/PokedexStore';
import AppConstants from '../constant/Constants';
import Header from './Header.jsx';
import PokemonCards from './PokemonCards.jsx';
import Loader from './Loader.jsx';
import Pagination from './Pagination.jsx';
import DetailedView from './DetailedView.jsx';
import { Snackbar, Button } from 'react-mdl';

const {
	ACTIONS_CONSTANT,
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

const hideContainer = {
	opacity: '0.5'
};

export default class PokedexContainer extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	data: [],
        	currentPage: 1,
        	cardsPerPage: 10,
        	isSnackbarActive: false,
        	warningMsg: '',
        	isFilter: false,
        	filterIndex: null,
        	openDialogue: false,
        	selectedIndex: null
        }
    }

    componentWillMount () {
    	//Initiating a call back to fetch pokemon data while loading the page
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
      */
    renderData = (data) => {
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
      */
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

    filterData = (index) => {
    	this.setState({
    		isFilter: true,
    		filterIndex: index
    	})
    }

    clearSearchFilter = () => {
    	this.setState({
    		isFilter: false,
    		filterIndex: null
    	})
    }

    getFilteredData = (availableData, index) => {
    	let filteredData = [];
    	filteredData.push(availableData[index]);
    	return filteredData;
    }

    /** @param: string - id of the user selected pokemon
      *
      * @description: Callback function to initiate API call to fetch attributes of a 
      * 			  user selected pokemon
      */
    showAttributes = (id) => {
    	this.setState({
    		openDialogue: true,
    		selectedIndex: id
    	})
    }

    handleCloseDialog = () => {
    	this.setState({
    		openDialogue: false
    	})
    }

 
	render () {

		const {data, currentPage, cardsPerPage, isFilter, filterIndex} = this.state;

		// Logic for current page contents
		const indexOfLastCard = currentPage * cardsPerPage;
		const indexOfFirstCard = indexOfLastCard - cardsPerPage;
		const currentData = data.slice(indexOfFirstCard, indexOfLastCard);

		// if user has enabled search OR filter, then render the specific content, else render the paginated data
		const currentPageContent = isFilter ? this.getFilteredData(data, filterIndex) : currentData;

		return (
			<div>
				<Header data={data} filterData={this.filterData} clearSearchFilter={this.clearSearchFilter}/>\
				<div style={this.state.openDialogue ? hideContainer : {}}>
					
					{ data.length ? // Show cards once data is loaded
                        <PokemonCards 
                            data={currentPageContent} 
                            showAttributes={this.showAttributes}/> 
                        : <Loader/> 
                    }
					
					{ data.length && !isFilter ?  // Hide pagination while displaying the search resutls
						<Pagination 
							pageNumber={currentPage}
							loadPreviousPage={this.loadPreviousPage}
							loadNextPage={this.loadNextPage}/> 
						: <noscript/> 
					}

				</div>
    				{ this.state.openDialogue && 
    					<DetailedView
    						selectedIndex={this.state.selectedIndex} 
    						openDialogue={this.state.openDialogue}
    						handleCloseDialog={this.handleCloseDialog}/> 
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