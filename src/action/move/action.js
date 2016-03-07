import { complement, compose, find, identity, last, prop } from 'ramda';
import { getNextPosition, iterateN } from '../util';

import tokenPosition from '../../model/tokenPosition';

const getFinalPosition = (position, dir, spaces) => {
	return last(iterateN(getNextPosition(dir), spaces, position));
};

export default (game, pos, dir, spaces) => {
	const movedToken = find(compose(pos.equals, prop('position')),
		game.getTokenPositions());
	const newPosition = getFinalPosition(movedToken.position, dir, spaces);

	return game.getTokenPositions().filter(complement(identity))
		.concat(tokenPosition(movedToken.token, newPosition));
};
