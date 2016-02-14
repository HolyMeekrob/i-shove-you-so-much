import { all, clone } from 'ramda';

export default (squares) => {
	(() => {
		if (!Array.isArray(squares)
			|| !all(Array.isArray, squares)) {
			throw new Error('Board squares must be a two-dimensional array');
		}
	})();

	const getSquares = () => clone(squares);

	return Object.freeze({
		getSquares
	});
};
