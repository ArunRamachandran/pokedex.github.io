'use strict'

import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { Tooltip, Icon, Chip } from 'react-mdl';
import '../stylesheets/pokedex-pagination.scss';

export default class Pagination extends Component {

	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="pokedex-pagination">
				<span>
					<Tooltip label="Move Back" position="left">
					    <Icon name="navigate_before" onClick={this.props.loadPreviousPage}/>
					</Tooltip>
				</span>
				<span>
					<Chip>Current Page : {this.props.pageNumber}</Chip>
				</span>
				<span>
					<Tooltip label="Next Page" position="right">
					    <Icon name="navigate_next" onClick={this.props.loadNextPage}/>
					</Tooltip>
				</span>
			</div>
		);
	}

}