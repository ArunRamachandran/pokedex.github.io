'use strict'

import Request from './RequestWebUtils';
import * as PokedexActionCreator from '../actions/PokedexActions';

const poke_api = 'https://pokeapi.co/api/v2/pokemon/';

export function fetchPokemonData () {
	let limit = 811;
	let url = `${poke_api}?limit=${limit}`;
	return Request.get(url)
		.then((body, res) => {
			PokedexActionCreator.dataLoaded(body.results);
		});
}

export function fetchPokemonAttributes (id) {
	let url = `${poke_api}${id}`;
	return Request.get(url)
		.then((body, res) => {
			PokedexActionCreator.attributesLoaded(body);
		});
}