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
				<span style={{marginRight: '5px'}}>
					<Tooltip label="Previous Page" position="left">
					    <Chip onClick={this.props.loadPreviousPage}>
					    	<Icon name="navigate_before" />
						</Chip>
					</Tooltip>
				</span>
				<span style={{marginLeft: '2px', marginRight: '2px'}}>
					<Chip>{this.props.pageNumber}</Chip>
				</span>
				<span style={{marginLeft: '5px'}}>
					<Tooltip label="Next Page" position="right">
						<Chip onClick={this.props.loadNextPage}>
						    	<Icon name="navigate_next" />
						</Chip>
					</Tooltip>
				</span>
			</div>
		);
	}

}