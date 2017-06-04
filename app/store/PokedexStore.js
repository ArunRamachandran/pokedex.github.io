'use strict'

import dispatcher from '../dispatcher/Dispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import { createStore } from './Store';
import AppConstants from '../constant/Constants';

const {
	API_CONSTANT,
	EVENT_CONSTANT
} = AppConstants;

let _pokedexData = null;
let _pokedexAttributes = [];


function updatePokexStore (data) {
	_pokedexData = data;
}

function updatePokedexAttributes (data) {
	_pokedexAttributes.push(data);
}

const PokedexStore = createStore ({
	currentState () {
		return _pokedexData;
	}
});

PokedexStore.dispatchToken = dispatcher.register (action => {

	switch (action.type) {
		case API_CONSTANT.LOAD_DATA:
			updatePokexStore(action.data);
			PokedexStore.emitChange(EVENT_CONSTANT.DATA_LOADED, action.data);
			break;

		case API_CONSTANT.LOAD_ATTRIBUTES:
			updatePokedexAttributes(action.data);
			PokedexStore.emitChange(EVENT_CONSTANT.ATTRIBUTES_LOADED, action.data);
			break;
	}
});

export default PokedexStore;