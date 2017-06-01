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


const PokedexStore = createStore ({
	currentState () {
		return _pokedexData;
	}
});

PokedexStore.dispatchToken = dispatcher.register (action => {

	switch (action.type) {
		case API_CONSTANT.LOAD_DATA:
			console.log("Store.. Data received");
			console.log("action.data : ", action);
			PokedexStore.emitChange(EVENT_CONSTANT.DATA_LOADED, action.data);
			console.log("Event emitted : ");
			break;
	}
});

export default PokedexStore;