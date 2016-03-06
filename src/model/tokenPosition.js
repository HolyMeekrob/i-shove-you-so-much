import { curry } from 'ramda';

export default curry((token, position) => {
	return Object.freeze({
		token,
		position
	});
});
