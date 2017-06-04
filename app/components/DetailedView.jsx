'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {fetchPokemonAttributes} from '../actions/PokedexActions';
import PokedexStore from '../store/PokedexStore';
import AppConstants from '../constant/Constants';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Spinner } from 'react-mdl';
import '../stylesheets/pokedex-detailed-view.scss';

const {
	ACTIONS_CONSTANT,
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

export default class DetailedView extends Component {

	static PropTypes = {
		attributes: PropTypes.object,
		openDialog: PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.state = {
			attributes: null
		}
	}

	componentWillMount() {
		fetchPokemonAttributes(this.props.selectedIndex);
	}

	componentDidMount() {
		PokedexStore.addChangeListner(EVENT_CONSTANT.ATTRIBUTES_LOADED, this.updatePokemonAttributes);
	}

	componentWillUnMount() {
		PokedexStore.removeChangeListner(EVENT_CONSTANT.ATTRIBUTES_LOADED, this.updatePokemonAttributes);
	}

	updatePokemonAttributes = (data) => {
    	console.log("Attributes : ", data);
    	this.setState({attributes: data});
    }

	getSpeciesAbilities = (data) => {
		let abilities = [];
		data.map((category, index) => {
			category.ability && abilities.push(category.ability.name);
		})
		return abilities.toString();

	}

	getSpeciesTypes = (data) => {
		let types = [];
		data.map((category, index) => {
			category.type && category.type.name && types.push(category.type.name);
		});
		return types.toString();
	}

	abstractDetatails = (attributes) => {
		let details = {};
		details.name = attributes.name;
		details.height = attributes.height;
		details.weight = attributes.weight;
		details.type = this.getSpeciesTypes(attributes.types);
		details.ability = this.getSpeciesAbilities(attributes.abilities);
		return details;
	}

	render () {

		const details = this.state.attributes && this.abstractDetatails(this.state.attributes);

		return (
			<Dialog open={this.props.openDialog} style={{display: 'block', zIndex: '10', top: '90px'}}>
	          { this.state.attributes ? 
	          	<div>
		          <DialogTitle>
		          	{details.name}
		          </DialogTitle>
		          <DialogContent className="dialog-content" style={{background: 'url(' + 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + `${this.state.attributes.id}.png` + ')' + 'top right 15% no-repeat'}}>
		            <span>Height : {details.height}</span>
		            <span>Weight : {details.weight}</span>
		            <span>Type   : {details.type}</span>
		            <span>Abilities : {details.ability}</span>
		          </DialogContent>
		          <DialogActions fullWidth>
		            <Button type='button' onClick={this.props.handleCloseDialog}>Close</Button>
		          </DialogActions>
		        </div>

		          : <Spinner/>
	          }
	        </Dialog>
	    
		);
	}

}