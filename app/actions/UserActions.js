import Alt from 'alt';

class UsersActions {

	fetchPokedox () {
		return ['a', 'b', 'c'];
	}

	add(name) {
		return name;
	}

	clear() {
		return null;
	}

}

export default Alt.createActions(UsersActions);