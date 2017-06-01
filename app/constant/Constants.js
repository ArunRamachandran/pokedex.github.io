'use strict'

import keyMirror from 'keymirror';

let AppConstants = {

	API_CONSTANT: keyMirror({
		LOAD_DATA: null
	}),

	ACTIONS_CONSTANT: keyMirror({}),

	EVENT_CONSTANT: keyMirror({
		DATA_LOADED: null
	})

}

export default AppConstants;

/*export const ACTION = {
	DATA_LOADED: "data_loaded"
};*/
