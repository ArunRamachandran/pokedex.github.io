'use strict'

import Superagent from 'superagent';

let Request = {
	
	get(url, headers = {}) {
		return new Promise(function(resolve, reject) {
			Superagent.get(url)
			.end(function(err, res) {
				err ? reject(res.body, err) : resolve(res.body, res);
			})
		});
	}
}

export default Request;