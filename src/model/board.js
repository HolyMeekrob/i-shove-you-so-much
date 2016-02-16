import { all, clone } from 'ramda';

export default (squares) => {
	(() => {
		if (!Array.isArray(squares)
			|| !all(Array.isArray, squares)) {
			throw new Error('Board squares must be a two-dimensional array');
		}
	})();

	const getSquares = () => clone(squares);
	const getSquareAt = (position) => squares[position.x][position.y];

	return Object.freeze({
		getSquares,
		getSquareAt
	});
};
