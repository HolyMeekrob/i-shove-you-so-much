import { complement, find } from 'ramda';
import { getNextPosition, iterateN } from '../util';

import tokenPosition from '../../model/tokenPosition';

const getFinalPosition = (dir, spaces, position) => {
	return iterateN(getNextPosition(dir), spaces, position);
};

export default (game, dir, pos, spaces) => {
	const movedToken = find(pos.equals, game.getTokenPositions());
	const newPosition = getFinalPosition(dir, spaces, movedToken.position);

	return game.getTokenPositions().filter(complement(pos.equals))
		.concat(tokenPosition(movedToken.token, newPosition));
};
