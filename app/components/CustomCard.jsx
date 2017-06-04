'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardText, Icon, CardTitle, CardActions } from 'react-mdl';
import {fetchPokemonAttributes} from '../actions/PokedexActions';
import AppConstants from '../constant/Constants';
import PokedexStore from '../store/PokedexStore';
import '../stylesheets/pokedex-cusotm-card.scss';

const {
	ACTIONS_CONSTANT,
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

const cardStyle = {
	width: '220px',
	height: '220px',
	margin: 'auto'
}

export default class CustomCard extends Component {

	static PropTypes = {
		pokemon: PropTypes.object.isRequired,
		pokemonId: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
	}

	render () {

		const {pokemon, pokemonId} = this.props;

		return (
			<Card shadow={0} className="pokemon-card-view" style={cardStyle} onClick={() => this.props.showAttributes(pokemonId)}>
			    <CardTitle expand style={{color: '#fff', background: 'url(' + 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + `${pokemonId}.png` + ')' + 'bottom right 15% no-repeat #46B6AC'}}>
			    	{pokemon.name}
			    </CardTitle>
			    <CardText>
			   
			    </CardText>			    
			</Card>
		);
	}

}