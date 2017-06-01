'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardText, Icon, CardTitle, CardActions } from 'react-mdl';
import '../stylesheets/pokedex-cards.scss';

const cardStyle = {
	width: '220px',
	height: '220px',
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
			//const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; 				

			return (
				<div className="pokemon-card" key={index}>
					<Card shadow={0} style={cardStyle}>
					    <CardTitle expand style={{color: '#fff', background: 'url(' + 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + `${pokemonId}.png` + ')' + 'bottom right 15% no-repeat #46B6AC'}}>{pokemon.name}</CardTitle>
					    <CardText>
					        
					    </CardText>
					    <CardActions border>
					        <Button colored>View Details</Button>
					    </CardActions>
					</Card>
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