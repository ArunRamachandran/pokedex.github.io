import React, {Component} from 'react';
import {render} from 'react-dom';
import '../stylesheets/pokedex-header.scss';

export default class Header extends Component {
	render (){
		return (
			<header id="pokedex-header">
				<h3>Pokedex</h3>
			</header>
		);
	}
}
