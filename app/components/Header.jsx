import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../stylesheets/pokedex-header.scss';

export default class Header extends Component {

	static PropTypes = {
		data: PropTypes.array,
		filterData: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			selectedValue: ''
		}
	}

	updateSearchValue = (data) => {
		this.setState({selectedValue: data.value});
		this.props.filterData(data.index);
	}

	/** @param: Object 
	  *
	  * @description: Function to handle pokemon search, pokedex container
	  * 			  will be filtered according to the user selected value
	  */
	handleSearch = (data) => {
		data ? this.updateSearchValue(data) : this.setState({selectedValue: ''});
		if (data) {
			// If user has searched for any specifc content
			this.setState({selectedValue: data.value});
			this.props.filterData(data.index);
		} else {
			// If user cleared the search value
			this.setState({selectedValue: ''});
			this.props.clearSearchFilter()
		}
	}

	/** @param: Array 
	  *
	  * @description: Function to convert list of pokemons into desired format for search field
	  */
	getSearchOptions = (data) => {
		let searchOptions = data.map((pokemon, index) => {
			return {value: pokemon.name, label: pokemon.name, index: index}
		});
		return searchOptions;
	}

	render (){

		let options = this.getSearchOptions(this.props.data)

		return (
			<div id="pokedex-header">
				<span>
					<h3>Pokedex</h3>
				</span>
				<span className="custom-search">
					<Select
					  name="form-field-name"
					  placeholder="Search your favourite pokemon .. "
					  value={this.state.selectedValue}
					  options={options}
					  onChange={this.handleSearch}/>
				</span>
				
			</div>
		);
	}
}
