'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Spinner } from 'react-mdl';
import '../stylesheets/pokedex-detailed-view.scss';

export default class DetailedView extends Component {

	static PropTypes = {
		attributes: PropTypes.object,
		openDialog: PropTypes.bool
	};

	constructor(props) {
		super(props);
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

		const { openDialog, attributes } = this.props;
		const pokemonId = attributes.id;

		const details = attributes && this.abstractDetatails(attributes);

		return (
			<Dialog open={openDialog} style={{display: 'block', zIndex: '10', top: '90px'}}>
	          { attributes ? 
	          	<div>
		          <DialogTitle>
		          	{details.name}
		          </DialogTitle>
		          <DialogContent className="dialog-content" style={{background: 'url(' + 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + `${pokemonId}.png` + ')' + 'top right 15% no-repeat'}}>
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