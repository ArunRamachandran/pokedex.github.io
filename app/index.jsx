import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx';
import PokedoxContainer from './components/PokedoxContainer.jsx';

import './stylesheets/pokedox-container.scss';

export default class App extends Component {

	constructor(props) {
        super(props);
    }

	render (){
		return (
			<div id="pokedox-main">
				<Header/>
				<PokedoxContainer/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));