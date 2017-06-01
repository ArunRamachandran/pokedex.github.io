'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import { ProgressBar } from 'react-mdl';
import '../stylesheets/custom-loader.scss'; 

export default class Loader extends Component {

	constructor (props) {
		super (props);
	}

	render () {
		return (
			<div className="customWrapper">
				<h4> Finding Pokemons ....</h4>
				<ProgressBar indeterminate />
			</div>
		);
	}
}