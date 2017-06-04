'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import CustomCard from './CustomCard.jsx';
import '../stylesheets/pokedex-cards.scss';

const cardStyle = {
	width: '220px',
	height: '260px',
	margin: 'auto'
}

export default class PokemonCards extends Component {

	static PropTypes = {
		data: PropTypes.array.isRequired
	}

	constructor (props) {
		super (props);
	}

	handleCloseDialog = () => {
		this.setState({openDialogue: false});
	}

	/** @param: string 
	  *
	  * @description: Function to extract pokemon id from the url
	  * 
	  */
	getId = (url) => {
		let urlSplit = url.split('/');
		let id = urlSplit[6];
		return id;
	}

	createCards = (data) => {
		let cards = data.map((pokemon, index) => {

			let pokemonId = this.getId(pokemon.url);

			return (
				<div className="pokemon-cards" key={index}>
					<CustomCard pokemon={pokemon} pokemonId={pokemonId} showAttributes={this.props.showAttributes}/>
				</div>
			);
		});
		return cards;
	}

	render () {

		let content = this.createCards(this.props.data);

		return (
			<div className="pokemon-page-view">
				{content}
			</div>
		);
	}

}