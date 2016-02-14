import { clone } from 'ramda';

export default (player, square) => {
	const getPlayer = () => clone(player);
	const getSquare = () => clone(square);

	return Object.freeze({
		getPlayer,
		getSquare
	});
};
