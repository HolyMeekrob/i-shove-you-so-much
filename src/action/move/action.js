import { complement, curry, find } from 'ramda';
import { getNextPosition, iterate } from '../util';

import tokenPosition from '../../model/tokenPosition';

const getFinalPosition = (dir, spaces, position) => {
	return iterate(curry(getNextPosition)(dir), spaces, position);
};

export default (game, dir, pos, spaces) => {
	const movedToken = find(pos.equals, game.getTokenPositions());
	const newPosition = getFinalPosition(dir, spaces, movedToken.position);

	return game.getTokenPositions().filter(complement(pos.equals))
		.concat(tokenPosition(movedToken.token, newPosition));
};
