'use strict'

import AppDispatcher from '../dispatcher/Dispatcher';
import * as PokedexAPI from '../api/PokedexAPI';
import AppConstants from '../constant/Constants';

const {
	ACTIONS_CONSTANT,
	API_CONSTANT
} = AppConstants;


// Function to invoke API call to fetch data from pokeapi.co
export function fetchPokemonData () {
	PokedexAPI.fetchPokemonData();
}

// Callback function to dispatch 
export function dataLoaded (data) {
	AppDispatcher.dispatch({
		type: API_CONSTANT.LOAD_DATA,
		data: data
	});
}

// Function to invoke API call to fetch pokemon attributes
export function fetchPokemonAttributes (id) {
	PokedexAPI.fetchPokemonAttributes(id);
}

export function attributesLoaded (attributes) {
	AppDispatcher.dispatch({
		type: API_CONSTANT.LOAD_ATTRIBUTES,
		data: attributes
	});
}