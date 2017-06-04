import React, {Component} from 'react';
import {render} from 'react-dom';
import PokedexContainer from './components/PokedexContainer.jsx';
import './stylesheets/pokedex-main.scss';

import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css';

export default class App extends Component {

	constructor(props) {
        super(props);
    }

	render (){
		return (
			<div>
				<PokedexContainer/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));