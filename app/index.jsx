import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx';
import PokedoxContainer from './components/PokedoxContainer.jsx';
import './stylesheets/pokedox-container.scss';

import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css';

export default class App extends Component {

	constructor(props) {
        super(props);
    }

	render (){
		return (
			<div>
				<Header/>
				<PokedoxContainer/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));