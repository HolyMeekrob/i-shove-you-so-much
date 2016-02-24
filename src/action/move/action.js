import { complement, curry, find } from 'ramda';
import { getNextPosition, iterate } from '../util';

import tokenPosition from '../../model/tokenPosition';

const getFinalPosition = (dir, spaces, position) => {
	return iterate(curry(getNextPosition)(dir), spaces, position);
};

export default (game, dir, pos, spaces) => {
	const hasPosition = (tp) =>
		tp.position.x === pos.x && tp.position.y === pos.y;

	const movedToken = find(hasPosition, game.getTokenPositions());
	const newPosition = getFinalPosition(dir, spaces, movedToken.position);

	return game.getTokenPositions().filter(complement(hasPosition))
		.concat(tokenPosition(movedToken.token, newPosition));
};
